import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

export interface LambdaAliasRetentionProps {
  readonly fn: lambda.Function;
  readonly lambdaAlias: string;
}

export class LambdaAliasRetention extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: LambdaAliasRetentionProps) {
    super(scope, id);

    const onEvent = new lambda.Function(this, 'MyHandler', {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset(path.join(__dirname, '../custom-resource-handler')),
      handler: 'lambda-alias-retention.on_event',
    });

    const myProvider = new cr.Provider(this, 'LambdaAliasProvider', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    onEvent.addToRolePolicy(new iam.PolicyStatement({
      actions: ['lambda:CreateAlias'],
      resources: [`arn:aws:lambda:${cdk.Stack.of(this).region}:${cdk.Stack.of(this).account}:function:${props.fn.functionName}`],
    }));

    const outputs = new cdk.CustomResource(this, 'LambdaAlias', {
      serviceToken: myProvider.serviceToken,
      properties: {
        regionName: cdk.Stack.of(this).region,
        functionName: props.fn.functionName,
        version: props.fn.currentVersion.version,
        alias: props.lambdaAlias,
      },
    });

    onEvent.node.addDependency(props.fn);
    outputs.node.addDependency(props.fn);
  }
}