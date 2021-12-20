import os
import json

def handler(event, context):
    print("Received event1: " + json.dumps(event, indent=2))