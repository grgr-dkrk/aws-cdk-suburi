import * as cdk from '@aws-cdk/core'
import {
  Vpc,
  Subnet,
  CfnInternetGateway,
  CfnVPCGatewayAttachment,
  CfnInstance,
  AmazonLinuxImage,
  InstanceType,
  SecurityGroup,
  RouterType,
} from '@aws-cdk/aws-ec2'
import {
  CIDR,
  CIDR_PUBLIC_SUBNET,
  CIDR_PRIVATE_SUBNET,
  INSTANCE_TYPE,
  AVAILABILITY_ZONE,
} from '../../constants'

export class AwsCdkSuburiEc2Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    /**
     * VPC
     */
    const vpc = new Vpc(this, 'cdk-vpc', {
      cidr: CIDR,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      subnetConfiguration: [],
    })

    /**
     * Subnet
     */
    const pubSubnet = new Subnet(this, 'SuburiPublicSubnet', {
      availabilityZone: AVAILABILITY_ZONE,
      vpcId: vpc.vpcId,
      cidrBlock: CIDR_PUBLIC_SUBNET,
    })
    new Subnet(this, 'SuburiPrivateSubnet', {
      availabilityZone: AVAILABILITY_ZONE,
      vpcId: vpc.vpcId,
      cidrBlock: CIDR_PRIVATE_SUBNET,
    })

    /**
     * Internet Gateway
     */
    const internetGateway = new CfnInternetGateway(this, 'InternetGateway', {})
    new CfnVPCGatewayAttachment(this, 'gatewayAttachment', {
      vpcId: vpc.vpcId,
      internetGatewayId: internetGateway.ref,
    })

    /**
     * RouteTable
     */
    pubSubnet.addRoute('PubSubnetRoute', {
      routerType: RouterType.GATEWAY,
      routerId: internetGateway.ref,
    })

    /**
     * SecurityGroup
     */
    const securityGroup = new SecurityGroup(this, 'securityGroup', {
      vpc,
    })

    /**
     * Instance
     */
    new CfnInstance(this, 'cdk-test', {
      availabilityZone: AVAILABILITY_ZONE,
      imageId: new AmazonLinuxImage().getImage(this).imageId,
      instanceType: new InstanceType(INSTANCE_TYPE).toString(),
      networkInterfaces: [
        {
          associatePublicIpAddress: true,
          deviceIndex: '0',
          groupSet: [securityGroup.securityGroupId],
          subnetId: pubSubnet.subnetId,
        },
      ],
    })
  }
}
