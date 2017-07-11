let config = require('config').aws;
let AWS = require("aws-sdk")
let fs = require('fs');

function buildS3FromConfiguration() {
  return new AWS.S3({
    endpoint: config.endpoint,
    accessKeyId: config.access_token,
    secretAccessKey: config.secret_access_key,
    region: config.region,
    maxRetries: config.s3.maxRetries
  });
}

function doUploadToS3(s3, data, filename) {
    let filestream = new Buffer(data, 'binary');
    s3.putObject({
      Bucket: config.s3.bucket,
      Key: filename,
      Body: filestream
    }, (err, data) => {
      if (err)
        console.log(err);
      else
        console.log(`Successfully uploaded {data}`);
    });
}

module.exports.uploadBinaryFileToS3 = (filename) => {
  s3 = buildS3FromConfiguration(); 
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
    doUploadToS3(s3, data, filename);
  });
}


