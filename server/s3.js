const AWS = require('aws-sdk')
const mime = require('mime-types')
const path = require('path')

//Set AWS region
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

//My S3 bucket name
const BUCKET_NAME = 'go-dutch-bucket'

const uploadFileToS3 = async (file, folder) => {
  const content = file.buffer // Get the buffer from multer
  const contentType = mime.contentType(file.originalname) // Detect MIME type from file extension
  const safeFilename = path.basename(file.originalname).replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const s3Key = `${folder}/${Date.now()}_${safeFilename}`

  const params = {
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: content,
    ContentType: contentType,
  }

  const upload = new AWS.S3.ManagedUpload({ params })
  const result = await upload.promise()

  console.log('RESULT LOCATION: ', result.Location)
  return result.Location // S3 URL
}

module.exports = { uploadFileToS3 }
