'use strict';
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.handler = (event, context, callback) => {
	console.log('event is', event);
  console.log('context is', context);
  const data = JSON.parse(event.body);

     if (data.text && typeof data.text !== 'string'){
         console.error('Validation Failed');
         callback(new Error('Body did not contain a text property.'));
         return;
      }
  
      // let remainingTime = context.getRemainingTimeInMillis();
    // let functionName = context.functionName;
    // let AWSrequestID = context.awsRequestId;
  
    const params = {
      TableName: 'BlogTable',
      Item: {
          article_id: "1",
          text: data.text
      },
  };
  const putCallback = (error, result) => {
    if (error) {
        console.error(error);
        callback(new Error('Could not save record.'));
        return;
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
  }
   dynamo.put(params, putCallback);
   console.log(" params " + params);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
          message: 'Created article.'
      }),
   }; 
  
   

  
  

 
 //  callback(null, response);
};