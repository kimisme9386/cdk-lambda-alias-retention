import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { LambdaAliasRetention } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stackTest = new cdk.Stack(app, 'TestStackCreateLambda', { env });

    const fn = new lambda.DockerImageFunction(stackTest, 'TestLambda', {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, '../lambda'),
      ),
      currentVersionOptions: {
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      },
    });

    new LambdaAliasRetention(stackTest, 'TestLambdaAliasRetention', {
      fn,
      lambdaAlias: 'v2',
    });

    app.synth();
    this.stack = [stackTest];
  }
}

new IntegTesting();