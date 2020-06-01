import { SynthUtils } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import { AwsCdkSuburiEc2Stack } from '../lib/ec2'
import { AwsCdkSuburiS3Stack } from '../lib/s3'

describe('SnapShot', () => {
  test('snapshot: ec2', () => {
    const app = new cdk.App()
    const stack = new AwsCdkSuburiEc2Stack(app, 'Ec2TestStack')
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  test('snapshot: s3', () => {
    const app = new cdk.App()
    const stack = new AwsCdkSuburiS3Stack(app, 'S3TestStack')
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})
