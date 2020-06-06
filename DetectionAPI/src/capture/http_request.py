import requests
import json

#Send a http request to the java server.
def send_post(URL, payload):
    headers = {'content-type': 'application/json'}
    print(json.dumps(payload));
    return requests.post(url = URL, data=json.dumps(payload), headers=headers)