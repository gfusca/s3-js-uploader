let AWS = require("aws-sdk")
let fs = require('fs');
let config = require('config').aws;

function buildS3FromConfiguration() {
  return new AWS.S3({
    endpoint: config.endpoint,
    accessKeyId: config.access_token,
    secretAccessKey: config.secret_access_key,
    region: config.region,
    maxRetries: config.s3.maxRetries
  });
}

function uploadBinaryFileToS3(s3, filename) {
  fs.readFile(filename, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }
    doUploadToS3(s3, data, filename);
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

function printHelp() {
  console.log("usage node main.js <filename>");
}

if (process.argv.length > 2) {
  let file = process.argv[2];
  uploadBinaryFileToS3(buildS3FromConfiguration(), file);
} else {
  printHelp();
}
