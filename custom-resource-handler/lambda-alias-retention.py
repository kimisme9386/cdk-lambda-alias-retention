#!/usr/bin/env python3

import boto3
from boto3.session import Session
import json

def on_event(event, context):
    print(event)
    request_type = event.get("RequestType")
    if request_type == "Create":
        return on_create(event)
    if request_type == "Update":
        return on_update(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: %s" % request_type)

def on_create(event):
    props = event["ResourceProperties"]
    print(f"create new resource with props {props}")
    region_name = props["regionName"]
    function_name = props.get("functionName")
    alias = props.get("alias")
    version = props.get("version")
    
    output = {}
    if alias:
        client = boto3.client('lambda', region_name=region_name)
        response = client.create_alias(
            FunctionName=function_name,
            Name=alias,
            FunctionVersion=version,
            Description=alias
        )
        print(f"debug response:{json.dumps(response, indent=2)}")
        output = {"aliasArn": response['AliasArn'], "FunctionVersion": response['FunctionVersion']}
        
    return {"Data": output}

def on_update(event):
    physical_id = event.get("PhysicalResourceId")
    props = event.get("ResourceProperties")
    print(f"update resource {physical_id} with props {props}")
    region_name = props["regionName"]
    function_name = props.get("functionName")
    alias = props.get("alias")
    version = props.get("version")
    
    output = {}
    if alias:
        client = boto3.client('lambda', region_name=region_name)
        response = client.create_alias(
            FunctionName=function_name,
            Name=alias,
            FunctionVersion=version,
            Description=alias
        )
        print(f"debug response:{json.dumps(response, indent=2)}")
        output = {"aliasArn": response['AliasArn'], "FunctionVersion": response['FunctionVersion']} 
        
    return {"PhysicalResourceId": physical_id, "Data": output}

def on_delete(event):
    physical_id = event.get("PhysicalResourceId")
    print("delete resource %s" % physical_id)