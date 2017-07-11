let s3 = require("./s3_uploader");

function printHelp() {
  console.log("usage node main.js <filename>");
}

if (process.argv.length > 2) {
  let file = process.argv[2];
  s3.uploadBinaryFileToS3(file);
} else {
  printHelp();
}
