import flask
from flask_cors import CORS, cross_origin
from tool_backend import *

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"

@app.route('/', methods=['POST'])
@cross_origin()
def parse_request():
    data = flask.request.data
    # print(data)
    response_code, probList, x_cord, y_cord = tool_main(data)
    response = flask.make_response()
    if response_code == 501:
        return flask.Response({}, status=501, mimetype='application/json')
    response = flask.jsonify([{'probCdfX':x_cord}, {'probCdfY':y_cord},{'probValList':[float(probList[0]), float(probList[1])]}])
    return response

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=8080)