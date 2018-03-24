from flask import Flask, Response, request, jsonify, send_from_directory
from pathlib import Path
import os

app = Flask(__name__, static_url_path = '')

@app.route('/static/js/<path:path>')
def js(path):
    return send_from_directory('static/js', path)

@app.route('/static/css/<path:path>')
def css(path):
    return send_from_directory('static/css', path)

@app.route('/')
def index():
    return send_from_directory('',"index.html")

@app.route('/shoppinglist', methods = ['GET','POST'])
def shoppinglist():
    wdir = os.path.dirname(os.path.realpath(__file__))
    f_path = wdir + "/shoppingList.txt"
    file = Path(f_path)

    if request.method == 'GET':
        # GET method
        # read json from text file
        with open(f_path, 'rb') as info:
            raw = info.read()
            resp = Response(raw)
            resp.headers['Content-type'] = 'application/json'
        return resp
    else:
        # POST method
        # write json to text file
        with open(f_path, 'wb') as info:
            resp = request.data
            info.write(resp)
        return resp

@app.route('/shoppinglistauto', methods=['GET', 'POST'])
def shopauto():
    wdir = os.path.dirname(os.path.realpath(__file__))
    f_path = wdir + "/shoppingListAuto.txt"
    file = Path(f_path)

    if request.method == 'GET':
        if os.path.exists(f_path):
            with open(f_path, "rb") as info:
                raw = info.read()
                resp = Response(raw)
                resp.headers['Content-type'] = 'application/json'
            return resp
    else:
        with open(f_path, "wb") as info:
            resp = request.data
            info.write(resp)
        return resp


if __name__ == "__main__":
    app.run(debug=True, port=5001)