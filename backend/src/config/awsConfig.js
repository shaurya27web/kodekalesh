const AWS = require('aws-sdk');

const configureAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
  });
  
  return {
    s3: new AWS.S3({ signatureVersion: 'v4' }),
    bucketName: process.env.AWS_BUCKET_NAME
  };
};

module.exports = { configureAWS };