const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const dbConnection = process.env.MONGODB_URL || 'mongodb://localhost:27017/lftbarebones';

const mongoConnect = callback => {
  MongoClient
  .connect(dbConnection)
  .then(client => {
    console.log('CONNECTED!');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
