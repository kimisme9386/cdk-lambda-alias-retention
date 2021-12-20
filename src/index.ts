import * as path from 'path';
import * as util from 'util';
import {
  Stack, CustomResource,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_logs as logs,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface LambdaAliasRetentionProps {
  fn: lambda.Function;
  lambdaAlias: string;
}

export class LambdaAliasRetention extends Construct {
  constructor(scope: Construct, id: string, props: LambdaAliasRetentionProps) {
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
      resources: [`arn:aws:lambda:${Stack.of(this).region}:${Stack.of(this).account}:function:${props.fn.functionName}`],
    }));

    const outputs = new CustomResource(this, 'LambdaAlias', {
      serviceToken: myProvider.serviceToken,
      properties: {
        regionName: Stack.of(this).region,
        functionName: props.fn.functionName,
        version: props.fn.currentVersion.version,
        alias: props.lambdaAlias,
      },
    });

    onEvent.node.addDependency(props.fn);
    outputs.node.addDependency(props.fn);

    console.log(outputs.getAttString('data'));
    console.log(util.inspect(outputs, { showHidden: false, depth: null, colors: true }));
  }
}