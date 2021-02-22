var AWS = require('aws-sdk');
var cloudformation = new AWS.CloudFormation();

exports.handler = async (event,context) => {
    // TODO implement
    
    console.log("event ::",event);
    console.log("context ::",context);
    
    var requestbody=JSON.parse(event.body);
    
    console.log("requestbody ::",requestbody);
    
    var preparedParms = await PrepareParams(requestbody);
    console.log("preparedParms ::",preparedParms);
    
    var responseOfLaunchStack = await LaunchAStack(preparedParms);
    
    if(responseOfLaunchStack=='Failed'){
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello, we could not process your at this moment, please check the error in logs and try again!'),
        };
        return response;
    }
    else{
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello, Your request is sent! check your cloudformation console on stack name = '+requestbody.StackName+' Output Section to get your wordpress site url!'),
        };
        return response;
    }
};

async function PrepareParams(requestbody){
    
    var params = {
      StackName: requestbody.StackName, /* required */
      Parameters: [
        {
          ParameterKey: 'InstanceType',
          ParameterValue: requestbody.InstanceType
        },
        {
          ParameterKey: 'KeyName',
          ParameterValue: requestbody.KeyName
        },
        {
          ParameterKey: 'SSHLocation',
          ParameterValue: requestbody.SSHLocation
        },
        {
          ParameterKey: 'Subnets',
          ParameterValue: requestbody.Subnets
        },
        {
          ParameterKey: 'VpcId',
          ParameterValue: requestbody.VpcId
        },
        {
          ParameterKey: 'DBClass',
          ParameterValue: requestbody.DBClass
        },
        {
          ParameterKey: 'VpcId',
          ParameterValue: requestbody.VpcId
        },
        {
          ParameterKey: 'DBName',
          ParameterValue: requestbody.DBName
        },
        {
          ParameterKey: 'DBUser',
          ParameterValue: requestbody.DBUser
        },
        {
          ParameterKey: 'DBPassword',
          ParameterValue: requestbody.DBPassword
        },
        {
          ParameterKey: 'WebServerCapacity',
          ParameterValue: requestbody.WebServerCapacity
        },
        {
          ParameterKey: 'DBAllocatedStorage',
          ParameterValue: requestbody.DBAllocatedStorage
        }
        
      ],
      Tags: [
        {
          Key: 'CreateBy', /* required */
          Value: 'ddv' /* required */
        },
        /* more items */
      ],
      RoleARN: 'arn:aws:iam::068270135678:role/CloudFormationRoleForCreateEc2',
      TemplateURL: 'https://templatestooore.s3.amazonaws.com/ALB-ASG-RDS-WordpressSite-01.template'
    };
    
    return params;
    
}

async function LaunchAStack(params){
        try{
            var data = await cloudformation.createStack(params).promise();
            console.log('data::',data);
            return 'Success';
        }
        catch(ex){
            console.log(ex);
            return 'Failed';
        }
}