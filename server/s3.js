const fs = require('fs').promises
const AWS = require('aws-sdk')
const mime = require('mime')

//Set AWS region
AWS.config.update({ region: 'us-west-1' })

//My S3 bucket name
const BUCKET_NAME = 'go-dutch-bucket'

const uploadFileToS3 = async (file) => {
  const content = await fs.readFile(file.path)
  const contentType = mime.getType(file.originalname)
  const path = require('path')
  const safeFilename = path.basename(file.originalname).replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const s3Key = `profiles/${Date.now()}_${safeFilename}`

  const params = {
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: content,
    ContentType: contentType,
    ACL: 'public-read',
  }

  const upload = new AWS.S3.ManagedUpload({ params })
  const result = await upload.promise()

  // Optionally clean up local temp file
  await fs.unlink(file.path)

  return result.Location // S3 URL
}

module.exports = { uploadFileToS3 }
