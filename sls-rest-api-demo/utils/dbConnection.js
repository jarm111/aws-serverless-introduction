const aws = require('aws-sdk');

module.exports = () => {
  const isOffline = process.env.IS_OFFLINE;
  let dynamoDb;
  if (isOffline === 'true') {
    dynamoDb = new aws.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    });
    console.log(dynamoDb);
  } else {
    dynamoDb = new aws.DynamoDB.DocumentClient();
  }

  return dynamoDb;
};
