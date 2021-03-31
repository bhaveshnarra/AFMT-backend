import flask
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from tool_backend import *

app = flask.Flask(__name__,static_url_path='', static_folder='AFMT2.0',template_folder='AFMT2.0')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello():
    return render_template('index.html')

@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)
def parse_request():
    data = json.loads(flask.request.data)
    print(data)
    response, response_code, probList, x_cord, y_cord = tool_main(data)
    # response = flask.make_response()
    if response_code > 499:
        return flask.Response({response}, status=response_code, mimetype='application/json')
    resp = flask.jsonify([{'probCdfX':x_cord}, {'probCdfY':y_cord},{'probValList':[float(probList[0]), float(probList[1])]}])
    return resp

@app.route('/downloadgeneratedafmtxml', methods=['GET'])
@cross_origin()
def downloadFile ():
    #For windows you need to use drive name [ex: F:/Example.pdf]
    path = "test_afmt.xml"
    return flask.send_file(path, as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)