[![NPM version](https://badge.fury.io/js/cdk-lambda-alias-retention.svg)](https://badge.fury.io/js/cdk-lambda-alias-retention)
[![PyPI version](https://badge.fury.io/py/cdk-lambda-alias-retention.svg)](https://badge.fury.io/py/cdk-lambda-alias-retention)
[![Release](https://github.com/kimisme9386/cdk-lambda-alias-retention/actions/workflows/release.yml/badge.svg)](https://github.com/kimisme9386/cdk-lambda-alias-retention/actions/workflows/release.yml)

# :warning: Deprecated

It can use official CDK Code to achieve it as below:


```ts
const lambdaAlias = fn.currentVersion.addAlias('v1');
lambdaAlias.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);
```


# cdk-lambda-alias-retention

Create lambda alias and retain it forever.

## What's the problem?

When using AWS CDK to create lambda with version and alias, it will retain the latest alias only. See the sample code as blow:


```ts
const fn = new lambda.DockerImageFunction(stackTest, 'TestLambda', {
    code: lambda.DockerImageCode.fromImageAsset(
    path.join(__dirname, '../lambda'),
    ),
    currentVersionOptions: {
    removalPolicy: RemovalPolicy.RETAIN,
    },
});

fn.currentVersion.addAlias('v1.0.0');
```

In general, the lambda code will be iterated continuously and the alias will be changed probably ever time, such as `v1.0.1`, `v1.0.2`, `v1.0.3` etc...

AWS CDK don't support to retain old alias now and it support to retain old version only.

## Support CDKv1 and CDKv2

#### CDKv2

```
npm install cdk-lambda-alias-retention
or
npm install cdk-lambda-alias-retention@latest
or
npm install cdk-lambda-alias-retention@^2.0.0
```


#### CDKv1

```
npm install cdk-lambda-alias-retention@cdkv1 
or
npm install cdk-lambda-alias-retention@^1.0.0
```


## Usage 

```ts
new LambdaAliasRetention(stackTest, 'TestLambdaAliasRetention', {
    fn,
    lambdaAlias: 'v1',
});
```

Complete sample code is in [src/integ.default.ts](src/integ.default.ts)

> It can use context or environemnt variable for lambdaAlias.



