import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";

/**
 * Client Task Portal Infrastructure Stack
 *
 * Free Tier Considerations:
 * - Cognito: 50,000 MAUs
 * - CloudWatch: Free tier monitoring
 * - Debug logging enabled for all services
 */
export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognito User Pool for authentication
    const userPool = new cognito.UserPool(this, "ClientTaskPortalUserPool", {
      userPoolName: "ClientTaskPortalUsers",
      selfSignUpEnabled: false, // Admin creates users
      signInAliases: { email: true },
      autoVerify: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For dev only
    });

    // Debug Lambda for auth flows
    const debugLambda = new lambda.Function(this, "DebugAuthLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log("Auth Event:", JSON.stringify(event, null, 2));
          return event;
        };
      `),
    });

    // Add debug logging to all auth flows
    userPool.addTrigger(cognito.UserPoolOperation.PRE_SIGN_UP, debugLambda);
    userPool.addTrigger(
      cognito.UserPoolOperation.POST_CONFIRMATION,
      debugLambda
    );
    userPool.addTrigger(
      cognito.UserPoolOperation.PRE_AUTHENTICATION,
      debugLambda
    );
    userPool.addTrigger(
      cognito.UserPoolOperation.POST_AUTHENTICATION,
      debugLambda
    );

    // Create user groups
    const freelancerGroup = new cognito.CfnUserPoolGroup(
      this,
      "FreelancerGroup",
      {
        userPoolId: userPool.userPoolId,
        groupName: "Freelancers",
        description: "Group for freelancer/admin users",
      }
    );

    const clientGroup = new cognito.CfnUserPoolGroup(this, "ClientGroup", {
      userPoolId: userPool.userPoolId,
      groupName: "Clients",
      description: "Group for client users with read-only access",
    });

    // Create app client for frontend
    const appClient = userPool.addClient("ClientPortalAppClient", {
      userPoolClientName: "ClientPortalWebApp",
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
      generateSecret: false, // For web apps only
    });

    // Output important IDs for frontend integration
    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "AppClientId", {
      value: appClient.userPoolClientId,
    });
  }
}
