import subprocess
import sys, flask
import time, json, struct
from fractions import Fraction
import xml.etree.ElementTree as ET

# Global variables
CREATE_NEW_CONSOLE = 0x00000010
database = { -1: 'obj'}
id_map = {}
max_id = 0

class AttackStep:
    p = 1
    r = 2
    w1 = 0
    w2 = 0
    p1 = 0
    p2 = 0
    repl_id = -1
    insp_id = -1
    def __init__(self, id, label, lamda, lamda1, fixedCost, fixedDMG, enable, detectionPercent, repairPossible, detectionTime, repairCost, repairTime, xCord):
        self.lamda = lamda
        self.lamda1 = lamda1
        self.enable = enable
        self.repairPossible = repairPossible
        self.detectionTime = detectionTime
        res = Fraction(detectionPercent).limit_denominator(10000)
        w1 = res.denominator - res.numerator
        w2 = res.numerator
        p1 = w1
        p2 = w2
        self.id = id
        self.label = label
        self.p = 1
        self.repairCost = repairCost
        self.repairTime = repairTime
        self.xCord = xCord
        self.fixedCost = fixedCost
        self.fixedDMG = fixedDMG

class AccidentalStep:
    w1 = 0
    w2 = 0
    repl_id = 0
    insp_id = 0
    def __init__(self, id, label, lamda, phases, thresholdPhase, failureProbability, inspectionCost, repairTime, repairCost, xCord):
        self.lamda = lamda
        self.phases = phases
        self.thresholdPhase = thresholdPhase
        res = Fraction(failureProbability).limit_denominator(10000)
        w1 = res.numerator
        w2 = res.denominator - res.numerator
        self.id = id
        self.label = label
        self.inspectionCost = inspectionCost
        self.repairTime = repairTime
        self.repairCost = repairCost
        self.xCord = xCord

class Gate:
    parent = 0
    lchild = 0
    rchild = 0
    def __init__(self, id, label, type, xCord):
        self.type = type
        self.id = id
        self.label = label
        self.xCord = xCord
    
    def setParent(self, parent):
        self.parent = parent

    def setLchild(self, lchild):
        self.lchild = lchild
    
    def setRchild(self, rchild):
        self.rchild = rchild

class TopEvent:
    def __init__(self, id, inspFreq):
        self.id = id
        self.inspFreq = inspFreq

def parse_data(data):
    # global max_id, query
    # global topEventId
    # # global database
    # tree = ET.fromstring(data)
    # root = tree[0][0]
    # query_node = tree[1]
    # topEventId = int(query_node.attrib["topEventId"])
    # query = query_node.text
    # print(query_node.attrib, query_node.text)
    global max_id
    graph_data = json.loads(data)
    print("\nPrinting begins --- ")
    # Get data for all the nodes
    node_id_counter = 0
    for node in graph_data:
        this_node = node["userData"]
        if(node["type"] == "ATTACK EVENT"):
            lmbda = float(1)/float(24 * int(this_node["meanTTA"]))
            # double lambda, int p, int a, int r, int id, bool Enable, double lambda1, int w1, int w2, int d, int possible, int detect_time, int repl_id,int p1,int p2
            # mttf, 1, fixedCOA, 2, , , mttf, detectionPerc,, fixedDMG, detection(bool 0/1), detectTime, detectionPerc(p1/p2)
            attack_step = AttackStep(node["id"], this_node["Label"], lmbda, lmbda, this_node["fixedCOA"],
                this_node["fixedDMG"], int(this_node["enable"] == "true"), float(this_node["detectionPercent"]),
                int(this_node["detection"]), int(this_node["detectionTime"])*24, int(this_node["inspectionCost"]),
                int(this_node["repairCost"]), int(this_node["repairTime"])*24, int(node["x"]))
            database[nodeId] = attack_step
            # print(attack_step)
        elif(node["type"] == "FAILURE EVENT"):
            lmbda = float(1)/float(24 * int(this_node["meanTTF"]))
            # id, label, lamda, phases, thresholdPhase, failureProbability, inspectionInterval, inspectionCost, inspection, repairInterval, repairTime, repairCost, xCord
            accidental_step = AccidentalStep(node["id"], this_node["Label"], lmbda, int(this_node["noOfPhases"]),
                int(this_node["thresholdPhase"]), float(this_node["failureProbability"]), this_node["inspectionCost"],
                int(this_node["repairTime"])*24, this_node["repairCost"], int(node["x"]))
            database[nodeId] = accidental_step
        elif(str(node["type"]).find("Gate") != -1):
            gate = Gate(node["id"], this_node["Label"], str(node["type"][:-5]), int(node["x"]))
            database[nodeId] = gate
        elif(node["type"] == "TOP EVENT"):
            nodeId = node_id_counter + 1
            topEvent = TopEvent(node["id"], node["userData"]['inspFeq'])
        node_id_counter = node_id_counter + 1

    # Set connections for gates
    for node in graph_data:
        if(node["type"] == "Connection"):
            nodeId = int(node["id"])
            max_id = max(nodeId, max_id)
            source = int(node["source"]["node"])
            target = int(node["target"]["node"])
            if isinstance(database[source], Gate):
                temp_gate = database[source]
                if temp_gate.lchild == 0:
                    temp_gate.setLchild(target)
                elif temp_gate.rchild == 0:
                    leftXCord = database[temp_gate.lchild].xCord
                    targetXCord = database[target].xCord
                    temp_gate.rchild = target
                    if leftXCord > targetXCord:
                        temp_cord = temp_gate.lchild
                        temp_gate.lchild = target
                        temp_gate.rchild = temp_cord
            elif isinstance(database[target], Gate):
                database[target].parent = source
            else:
                print("Syntax error, non gate nodes connected. Illegal connection: ", database[source].label, "-->", database[target].label)

        # print("|-->" + child[0].tag, child[0].attrib)

def getNewId():
    global max_id
    ret = max_id
    max_id = max_id + 1
    return ret

def generateSysDecl():
    ret = ""
    systemInstances = "system"
    # global properties for the system
    topEventId = 0
    inspFreq = 4400 # TO be set
    preventive = 1
    corrective = 1
    for key in database:
        if isinstance(database[key], AttackStep):
            atStep = database[key]
            # link_RTU_CC = BE_malicious(0.00083,1,A,R,20,1,0.00083,8,2,100,1,120,120,3,7);
            # malicious_inspect20 = malicious_inspect(20,Int,0,P);
            # malicious_repair120 = malicious_repair(120,3,100,C);
            at_id = getNewId()
            id_map[atStep.id] = at_id
            replId = getNewId()
            ret += "%s_%d = BE_malicious(%f, %d, %d, %d, %d, %d, %d, %f, %d, %d, %d, %d, %d, %d, %d);\n" % ('_'.join(atStep.label.split()), at_id, atStep.lamda, atStep.p, atStep.fixedCost, atStep.r, at_id, atStep.enable, atStep.lamda1, atStep.w1, atStep.w2, atStep.fixedDMG, atStep.repairPossible, atStep.detectionTime, replId, atStep.p1, atStep.p2)
            ret += "insp_%d = malicious_inspect(%d, %d, %d, %d);\n" % (at_id, at_id, inspFreq, atStep.inspectionCost, preventive)
            ret += "repl_%d = malicious_repair(%d, %d, %d, %d);\n" % (at_id, replId, atStep.repairTime, atStep.repairCost, corrective)
            systemInstances += " %s_%d, insp_%d, repl_%d," % ('_'.join(atStep.label.split()), at_id, at_id, at_id)
        elif isinstance(database[key], AccidentalStep):
            acStep = database[key]
            # faulty_sensor_measure = BE_repair(1,1,0,0.00046,2,1,101,201);
            # replacement101=replacement(101,4347,10,500,C);
            # failure_listener101=failure_listener(1,101);
            # inpection201=inspection(201,101,Int,600,P);
            ac_id = getNewId()
            id_map[acStep.id] = ac_id
            replId = getNewId()
            inspId = getNewId()
            ret += "%s_%d = BE_repair(%d, %d, %d, %f, %d, %d, %d, %d);\n" % ('_'.join(acStep.label.split()), ac_id, ac_id, acStep.w1, acStep.w2, acStep.lamda, acStep.phases, acStep.thresholdPhase, replId, inspId)
            ret += "insp_%d = inspection(%d, %d, %d, %d, %d);\n" % (ac_id, inspId, replId, inspFreq, acStep.inspectionCost, preventive)
            ret += "repl_%d = replacement(%d, %d, %d);\n" % (ac_id, replId, inspFreq, acStep.repairTime, acStep.repairCost, corrective)
            systemInstances += " %s_%d, insp_%d, repl_%d," % ('_'.join(acStep.label.split()), ac_id, ac_id, ac_id)
        elif isinstance(database[key], TopEvent):
            topEvent = database[key]
            topEventId = topEvent.id
            inspFreq = topEvent.inspFreq

    for key in database:
        if isinstance(database[key], Gate):
            gateNode = database[key]
            gate_id = getNewId()
            id_map[gateNode.id] = gate_id
            varName = "%s_%d" % ('_'.join(gateNode.label.split()), gate_id)
            ret += "int %s[2] = {%d, %d};\n" % (varName, id_map[gateNode.lchild], id_map[gateNode.rchild])
            ret += "G%d = %s(%d, %s);\n" % (gate_id, gateNode.type, gate_id, varName)
            systemInstances += " G%d," % (gate_id)

    ret += "top_event=Top_event(%s);\n" % (str(topEventId))
    systemInstances = systemInstances + " top_event;"
    ret += systemInstances
    # print(ret)
    return ret

def updateTemplate(infilename, outfilename, sysDeclarations):
    templateXML = ET.parse(infilename)
    templateRoot = templateXML.getroot()
    for child in templateRoot.iter():
        if child.tag == 'system':
            child.text = sysDeclarations
        # if child.tag == 'queries':
        #     child[0][0].text = query
    templateXML.write(outfilename)

def parseOutput(stdout):
    # For generating graph
    x = 0
    runs = 0
    start = 0
    end = 0
    index = -1
    probability = ""
    mean = 0.0
    cumprob = []

    for line in stdout:
        line = str(line)
        print(line)
        x=x+1
        if x==10 :  
            #print(line)
            for i in line:
                if  i == '(' :
                    continue
                elif i.isdigit() == True:
                    runs = runs*10 + int(i)
                elif i == ')':
                    break
            for ch in line:
                index=index+1
                if ch=='[' :
                    start=index+1
                if ch==']' :
                    end=index+1
            probability = line[start:end-1]
            prob_list = probability.split(',')
            
        if x==12:
            index=-1
            for ch in line:
                index=index+1
                if ch=='[' :
                    start=index+1
                if ch==']' :
                    end=index+1
            probability = line[start:end-1]
            val_list = probability.split(',')          
    
            ind = line.find('=')
            newstr = line[ind+1:]
            end=ind
            for i in newstr :
                if i.isdigit() != True and i != '.' :
                    break
                else :
                    end=end+1
            
            mean= line[ind+1:end+1]
            ind = newstr.find('=')
            newstr1 = newstr[ind+1:]
            end=ind
            for i in newstr1 :
                if i.isdigit() != True and i != '.' :
                    break
                else :
                    end=end+1
            steps=newstr[ind+1:end+1] 
            ind = line.find(':')
            newstr = line[ind+1:-6]
            cumprob = newstr.split()

    length =  len(cumprob)
    cumprob[0]=float(cumprob[0]) + 0.0
    for i in range(1, length) :
        cumprob[i]=float(cumprob[i]) + float(cumprob[i-1])

    x_cord = []
    y_cord = []
    xcord = float(val_list[0])
    for i in range(length) :
        x_cord.append(xcord/24)
        y_cord.append(cumprob[i]/runs)
        xcord=xcord+float(steps)

    return prob_list, x_cord, y_cord

def tool_main(data):
    # data = "jsonData"
    # with open('data.json', 'r') as file:
    #     data = file.read()
    parse_data(data)
    sysDeclaration = generateSysDecl()
    updateTemplate('AFMT_final_updates.xml', 'test_afmt.xml', sysDeclaration)
    pid = subprocess.Popen('./verifyta.exe -O std test_afmt.xml', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
    # For Windows # , creationflags=CREATE_NEW_CONSOLE

    out = pid.stdout.read()
    out = out.split(b'\r\n')
    response = json.dumps({})
    response_code = 200
    try:
        probList, x_cord, y_cord = parseOutput(out)
        # response = json.dumps([{'probCdfX':x_cord}, {'probCdfY':y_cord},{'probValList':[float(probList[0]), float(probList[1])]}], indent=True)
        return response_code, probList, x_cord, y_cord
    except:
        response_code = 501
    return response_code, "", "", ""
    # print(response)

# if __name__ == "__main__":
#     main()