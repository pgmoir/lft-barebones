// import aws from 'aws-sdk';
//import fs from 'fs';

// const deleteFile = (filePath) => {
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       throw err;
//     }
//   });
// }
// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: 'eu-west-1'
// });

// const s3 = new aws.S3();

export const deleteImage = (imageKey) => {
  var params = {  Bucket: 'lft-concept-barebones', Key: imageKey };
  // s3.deleteObject(params, function(err, data) {
  //   if (err) {
  //     console.log(err, err.stack);
  //   }
  //   else {
  //     console.log('IMAGE DELETED FROM S3');
  //   }
  // });
  return;
}

