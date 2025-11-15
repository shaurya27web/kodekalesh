const AWS = require('aws-sdk');
const crypto = require('crypto');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3({ signatureVersion: 'v4' });

class AWSService {
  async uploadToS3(content, contentType) {
    const extension = contentType === 'blog' ? 'md' : 'txt';
    const objectKey = `content/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${extension}`;
    
    await s3.putObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: objectKey,
      Body: content,
      ContentType: 'text/plain'
    }).promise();

    const s3Uri = `s3://${process.env.AWS_BUCKET_NAME}/${objectKey}`;
    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;
    
    console.log('✅ Uploaded to S3:', objectKey);
    return { s3Uri, publicUrl, objectKey };
  }
}

module.exports = new AWSService();