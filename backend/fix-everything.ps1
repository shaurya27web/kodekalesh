Write-Host "QUICK FIX RUNNING"

# Test AWS
aws sts get-caller-identity

# Get account
$accountId = aws sts get-caller-identity --query Account --output text

# Create S3 bucket
aws s3 mb "s3://aptchain-final-$accountId" --region us-west-2

Write-Host "DONE - S3 Bucket: aptchain-final-$accountId"
Write-Host "Now run: npm start"