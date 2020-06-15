import * as cdk from '@aws-cdk/core'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'

export class AwsCdkSuburiLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // @ts-ignore
    new NodejsFunction(this, 'lambdaNodeJsHandler', {
      containerEnvironment: {
        NODE_ENV: 'production',
      },
    })
  }
}
