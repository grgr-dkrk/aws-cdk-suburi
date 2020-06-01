import * as cdk from '@aws-cdk/core'
import { CfnBucket, CfnBucketPolicy, Bucket } from '@aws-cdk/aws-s3'
import { PolicyStatement, Effect, AccountPrincipal } from '@aws-cdk/aws-iam'
import { CONDITION_NOT_IP } from '../../constants'

export class AwsCdkSuburiS3Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    /**
     * Bucket
     */
    const bucket = new Bucket(this, 'Bucket', {
      bucketName: 'aws-cdk-suburi-bucket',
    })

    /**
     * Policy Statement
     */
    const principal = new AccountPrincipal(props?.env?.account)
    const policyStatement = new PolicyStatement({
      actions: ['s3:GetObject'],
      effect: Effect.DENY,
      principals: [principal],
      resources: [`${bucket.bucketArn}/*`],
      conditions: {
        ...CONDITION_NOT_IP,
      },
    })

    /**
     * BucketPolicy
     */
    bucket.addToResourcePolicy(policyStatement)
  }
}
