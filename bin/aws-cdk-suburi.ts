#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { AwsCdkSuburiStack } from '../lib/aws-cdk-suburi-stack';

const app = new cdk.App();
new AwsCdkSuburiStack(app, 'AwsCdkSuburiStack');
