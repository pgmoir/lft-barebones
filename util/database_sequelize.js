const Sequelize = require('sequelize');

function getDbConnection(dbUrl) {
   var dbConnection = {};
   dbUrl = dbUrl.replace('mysql://', '').replace('?reconnect=true', '');
   var dbItems = dbUrl.split(":");
   dbConnection.user = dbItems[0];
   dbItems = dbItems[1].split("@");
   dbConnection.password = dbItems[0]
   dbItems = dbItems[1].split("/");
   dbConnection.host = dbItems[0]
   dbConnection.database = dbItems[1]
   return dbConnection;
}

const dbConnection = getDbConnection(process.env.CLEARDB_DATABASE_URL || 'mysql://root:mysql.12345@localhost/node-complete?reconnect=true')

// const pool = mysql.createPool({
//    host: dbConnection.host,
//    user: dbConnection.user,
//    database: dbConnection.database,
//    password: dbConnection.password
// });

const sequelize = new Sequelize(dbConnection.database, dbConnection.user, dbConnection.password, {
   dialect: 'mysql',
   host: dbConnection.host
});


module.exports = sequelize;
