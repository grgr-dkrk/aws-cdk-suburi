import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import { AwsCdkSuburiEc2Stack } from '../lib/ec2'

test('Subnet Queue Created', () => {
  const app = new cdk.App()
  const stack = new AwsCdkSuburiEc2Stack(app, 'MyTestStack')
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {}))
})
