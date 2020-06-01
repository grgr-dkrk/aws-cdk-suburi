#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'
import { AwsCdkSuburiEc2Stack } from '../lib/ec2'
import { REGION } from '../constants'

const env = {
  account: process.env.ACCOUNT,
  region: REGION,
}

const app = new cdk.App()
new AwsCdkSuburiEc2Stack(app, 'AwsCdkSuburiEc2Stack', { env })
