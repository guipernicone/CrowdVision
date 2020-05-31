from flask import Flask, request
import json
from object_detection_real_time import run_detection
app = Flask(__name__)

@app.route('/detection', methods =['POST'])
def detection():
    content = request.get_json()
    run_detection(content);
    return "success"

if __name__ == "__main__":
    app.run(debug=True)