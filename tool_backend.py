import subprocess
import sys
import time, json, struct
from fractions import Fraction
import xml.etree.ElementTree as ET

# Global variables
CREATE_NEW_CONSOLE = 0x00000010
database = { -1: 'obj'}
id_map = {}
max_id = 0
gate_map = {"AND":"gate_and2", "SAND":"gate_sand2", "OR":"gate_or2"}
g_inspFreq = 4400

class AttackStep:
    p = 1
    r = 2
    repl_id = -1
    insp_id = -1
    inspectionCost = 100
    def __init__(self, id, label, lamda, lamda1, fixedCost, fixedDMG, enable, detectionPercent, repairPossible, detectTime, repairCost, repairTime, xCord):
        self.lamda = lamda
        self.lamda1 = lamda1
        self.enable = enable
        self.repairPossible = repairPossible
        self.detectTime = detectTime
        res = Fraction(detectionPercent/100).limit_denominator(10000)
        self.w1 = int(res.denominator - res.numerator)
        self.w2 = int(res.numerator)
        self.p1 = self.w1
        self.p2 = self.w2
        self.id = id
        self.label = label
        self.p = 1
        self.repairCost = repairCost
        self.repairTime = repairTime
        self.xCord = xCord
        self.fixedCost = fixedCost
        self.fixedDMG = fixedDMG

class AccidentalStep:
    repl_id = 0
    insp_id = 0
    inspectionCost = 100
    def __init__(self, id, label, lamda, phases, thresholdPhase, failureProbability, repairTime, repairCost, xCord):
        self.lamda = lamda
        self.phases = phases
        self.thresholdPhase = thresholdPhase
        res = Fraction(failureProbability/100).limit_denominator(10000)
        self.w1 = int(res.numerator)
        self.w2 = int(res.denominator - res.numerator)
        self.id = id
        self.label = label
        # self.inspectionCost = inspectionCost
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
    graph_data = data
    # print("\nPrinting begins --- ")
    # Get data for all the nodes
    node_id_counter = 0
    for node in graph_data:
        # print()
        # print(node)
        # print()
        this_node = node["userData"]
        nodeId = node["id"]
        if(node["type"] == "ATTACK EVENT"):
            lmbda = float(1)/float(24 * int(this_node["meanTTA"]["value"]))
            # double lambda, int p, int a, int r, int id, bool Enable, double lambda1, int w1, int w2, int d, int possible, int detect_time, int repl_id,int p1,int p2
            # mttf, 1, fixedCOA, 2, , , mttf, detectionPerc,, fixedDMG, detection(bool 0/1), detectTime, detectionPerc(p1/p2)
            attack_step = AttackStep(node["id"], this_node["Label"], lmbda, lmbda, int(this_node["fixedCOA"]["value"]), int(this_node["fixedDMG"]["value"]), int(this_node["enable"]["value"] == True), float(this_node["detectionPercent"]["value"]), int(this_node["detection"]["value"] == True), int(this_node["detectTime"]["value"])*24, int(this_node["repairCost"]["value"]),  int(this_node["repairTime"]["value"]) *24, int(node["x"]))
                # int(this_node["inspectionCost"]["value"]),  int(this_node["repairTime"]["value"])*24
            database[nodeId] = attack_step
            # print(attack_step)
        elif(node["type"] == "FAILURE EVENT"):
            lmbda = float(1)/float(24 * int(this_node["meanTTF"]["value"]))
            # id, label, lamda, phases, thresholdPhase, failureProbability, inspectionInterval, inspectionCost, inspection, repairInterval, repairTime, repairCost, xCord
            accidental_step = AccidentalStep(node["id"], this_node["Label"], lmbda, int(this_node["noOfPhases"]["value"]),
                int(this_node["thresholdPhase"]["value"]), int(this_node["failureProbability"]["value"]), int(this_node["repairTime"]["value"])*24, int(this_node["repairCost"]["value"]), int(node["x"]))
                # float(this_node["failureProbability"]["value"]), this_node["inspectionCost"]["value"], int(this_node["repairTime"]["value"])*24
            database[nodeId] = accidental_step
        elif(str(node["type"]).find("Gate") != -1):
            gate = Gate(node["id"], this_node["Label"], str(node["type"][:-5]), int(node["x"]))
            database[nodeId] = gate
        elif(node["type"] == "TOP EVENT"):
            global g_inspFreq
            g_inspFreq = int(node["userData"]["inspFreq"]["value"])
            topEvent = TopEvent(node["id"], g_inspFreq)
            database[nodeId] = topEvent
        node_id_counter = node_id_counter + 1

    # Set connections for gates
    for node in graph_data:
        if(node["type"] == "draw2d.Connection"):
            # nodeId = int(node["id"])
            # max_id = max(nodeId, max_id)
            source = node["source"]["node"]
            target = node["target"]["node"]
            if isinstance(database[source], Gate):
                if isinstance(database[target], TopEvent):
                    database[target].id = source
                temp_gate = database[source]
                port = node["source"]["port"]
                if port == "output0":
                    temp_gate.parent = target
                elif port == "input0":
                    temp_gate.lchild = target
                else:
                    temp_gate.rchild = target
            if isinstance(database[target], Gate):
                if isinstance(database[source], TopEvent):
                    database[source].id = target
                temp_gate = database[target]
                port = node["target"]["port"]
                if port == "output0":
                    temp_gate.parent = source
                elif port == "input0":
                    temp_gate.lchild = source
                else:
                    temp_gate.rchild = source
            # else:
            #     print("Syntax error, non gate nodes connected. Illegal connection: ", database[source].label, "-->", database[target].label)

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
    inspFreq = int(8800/g_inspFreq)
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
            ret += "%s_%d = BE_malicious(%f, %d, %d, %d, %d, %d, %f, %d, %d, %d, %d, %d, %d, %d, %d);\n" % ('_'.join(atStep.label.split()), at_id, atStep.lamda, atStep.p, atStep.fixedCost, atStep.r, at_id, atStep.enable, atStep.lamda1, atStep.w1, atStep.w2, atStep.fixedDMG, atStep.repairPossible, atStep.detectTime, replId, atStep.p1, atStep.p2)
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
            # print(acStep.w1, acStep.w2)
            #  interval given as 0
            ret += "repl_%d = replacement(%d, %d, %d, %d, %d);\n" % (ac_id, replId, 0, acStep.repairTime, acStep.repairCost, corrective)
            ret += "failure_listener_%d = failure_listener(%d, %d);\n" % (ac_id, ac_id, replId)
            systemInstances += " %s_%d, insp_%d, repl_%d, failure_listener_%d," % ('_'.join(acStep.label.split()), ac_id, ac_id, ac_id, ac_id)
        elif isinstance(database[key], Gate):
            gateNode = database[key]
            gate_id = getNewId()
            id_map[gateNode.id] = gate_id

    for key in database:
        if isinstance(database[key], Gate):
            gateNode = database[key]
            gate_id = id_map[gateNode.id]
            varName = "%s_%d" % ('_'.join(gateNode.label.split()), gate_id)
            ret += "int %s[2] = {%d, %d};\n" % (varName, id_map[gateNode.lchild], id_map[gateNode.rchild])
            ret += "G%d = %s(%d, %s);\n" % (gate_id, gate_map[gateNode.type], gate_id, varName)
            systemInstances += " G%d," % (gate_id)
        elif isinstance(database[key], TopEvent):
            topEventId = id_map[database[key].id]

    ret += "top_event=Top_event(%d);\n" % (topEventId)
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
        # print(line)
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
        try:    
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
        except:
            return prob_list, None, None

    length =  len(cumprob)
    if (length == 0):
        return prob_list, None, None
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
    # with open('data_n.json', 'r') as file:
    #     data = file.read()
    global id_map, database
    id_map.clear()
    database.clear()
    errMessPref = "Syntax/value error in the graph, unable to parse the input."
    try:
        parse_data(data)
        sysDeclaration = generateSysDecl()
        updateTemplate('AFMT_final_updates.xml',
                       'test_afmt.xml', sysDeclaration)
        pid = subprocess.Popen('./verifyta -O std test_afmt.xml', shell=True,
                               stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
        # For Windows # , creationflags=CREATE_NEW_CONSOLE
    except ZeroDivisionError as e:
        print(e.with_traceback)
        return json.dumps({"Message": errMessPref + " Inspection Frequency can't be zero."}), 501, "", "", ""
    except Exception as e:
        return json.dumps({"Message": errMessPref + str(e.__class__) + str(e)}), 501, "", "", ""
    

    out = pid.stdout.read()
    out = out.split(b'\n')
    response = json.dumps({"Message": "Success"})
    response_code = 200
    try:
        probList, x_cord, y_cord = parseOutput(out)
        # response = json.dumps([{'probCdfX':x_cord}, {'probCdfY':y_cord},{'probValList':[float(probList[0]), float(probList[1])]}], indent=True)
        if x_cord is not None:
            return response, response_code, probList, x_cord, y_cord
        resp = ""
        if float(probList[0]) == 0:
            resp = "Top event can not be realised as it is highly improbable with the given tree values \n Try tweaking the values or making the tree more expressive"
        else:
            resp = "Top event will be realised with very high probabilty with the given tree values \n Try tweaking the values or making the tree less expressive"
        response = json.dumps({"Message": resp})
    except Exception as e:
        resp = "Syntax/value out of bound error, unable to parse verifyta output - " + \
            str(pid.stderr.read().split(b'\n'))
        print("Syntax/value out of bound error, unable to parse verifyta output")
        response = json.dumps({"Message": resp})
    response_code = 502
    return response, response_code, "", "", ""
    # print(response)

# if __name__ == "__main__":
#     tool_main()
