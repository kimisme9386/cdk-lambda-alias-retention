# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### LambdaAliasRetention <a name="cdk-lambda-alias-retention.LambdaAliasRetention" id="cdklambdaaliasretentionlambdaaliasretention"></a>

#### Initializers <a name="cdk-lambda-alias-retention.LambdaAliasRetention.Initializer" id="cdklambdaaliasretentionlambdaaliasretentioninitializer"></a>

```typescript
import { LambdaAliasRetention } from 'cdk-lambda-alias-retention'

new LambdaAliasRetention(scope: Construct, id: string, props: LambdaAliasRetentionProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdklambdaaliasretentionlambdaaliasretentionparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdklambdaaliasretentionlambdaaliasretentionparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`props`](#cdklambdaaliasretentionlambdaaliasretentionparameterprops)<span title="Required">*</span> | [`cdk-lambda-alias-retention.LambdaAliasRetentionProps`](#cdk-lambda-alias-retention.LambdaAliasRetentionProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-lambda-alias-retention.LambdaAliasRetention.parameter.scope" id="cdklambdaaliasretentionlambdaaliasretentionparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-lambda-alias-retention.LambdaAliasRetention.parameter.id" id="cdklambdaaliasretentionlambdaaliasretentionparameterid"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-lambda-alias-retention.LambdaAliasRetention.parameter.props" id="cdklambdaaliasretentionlambdaaliasretentionparameterprops"></a>

- *Type:* [`cdk-lambda-alias-retention.LambdaAliasRetentionProps`](#cdk-lambda-alias-retention.LambdaAliasRetentionProps)

---





## Structs <a name="Structs" id="structs"></a>

### LambdaAliasRetentionProps <a name="cdk-lambda-alias-retention.LambdaAliasRetentionProps" id="cdklambdaaliasretentionlambdaaliasretentionprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { LambdaAliasRetentionProps } from 'cdk-lambda-alias-retention'

const lambdaAliasRetentionProps: LambdaAliasRetentionProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`fn`](#cdklambdaaliasretentionlambdaaliasretentionpropspropertyfn)<span title="Required">*</span> | [`aws-cdk-lib.aws_lambda.Function`](#aws-cdk-lib.aws_lambda.Function) | *No description.* |
| [`lambdaAlias`](#cdklambdaaliasretentionlambdaaliasretentionpropspropertylambdaalias)<span title="Required">*</span> | `string` | *No description.* |

---

##### `fn`<sup>Required</sup> <a name="cdk-lambda-alias-retention.LambdaAliasRetentionProps.property.fn" id="cdklambdaaliasretentionlambdaaliasretentionpropspropertyfn"></a>

```typescript
public readonly fn: Function;
```

- *Type:* [`aws-cdk-lib.aws_lambda.Function`](#aws-cdk-lib.aws_lambda.Function)

---

##### `lambdaAlias`<sup>Required</sup> <a name="cdk-lambda-alias-retention.LambdaAliasRetentionProps.property.lambdaAlias" id="cdklambdaaliasretentionlambdaaliasretentionpropspropertylambdaalias"></a>

```typescript
public readonly lambdaAlias: string;
```

- *Type:* `string`

---



