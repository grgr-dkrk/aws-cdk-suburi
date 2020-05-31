import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import * as AwsCdkSuburi from '../lib/aws-cdk-suburi-stack'

test('Subnet Queue Created', () => {
  const app = new cdk.App()
  const stack = new AwsCdkSuburi.AwsCdkSuburiStack(app, 'MyTestStack')
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {}))
})
