import * as path from 'path';
import { App, Stack, RemovalPolicy, aws_lambda as lambda } from 'aws-cdk-lib';
import { LambdaAliasRetention } from './index';

export class IntegTesting {
  readonly stack: Stack[];
  constructor() {
    const app = new App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stackTest = new Stack(app, 'TestStackCreateLambda', { env });

    const fn = new lambda.DockerImageFunction(stackTest, 'TestLambda', {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, '../lambda'),
      ),
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.RETAIN,
      },
    });

    new LambdaAliasRetention(stackTest, 'TestLambdaAliasRetention', {
      fn,
      lambdaAlias: 'v1',
    });

    app.synth();
    this.stack = [stackTest];
  }
}

new IntegTesting();