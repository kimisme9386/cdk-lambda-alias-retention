import os
import json

def handler(event, context):
    print("Received event2: " + json.dumps(event, indent=2))