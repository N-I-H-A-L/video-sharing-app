import AWS from 'aws-sdk';

// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: 'ap-south-1'
});

// Create S3 client
const s3 = new AWS.S3();

export { s3 };
