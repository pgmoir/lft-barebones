import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;

let _db;

const dbConnection = process.env.MONGODB_URL;

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

export const mongoConnect = mongoConnect;
export const getDb = getDb;
