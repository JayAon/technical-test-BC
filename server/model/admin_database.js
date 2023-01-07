var sql = require("mssql");

// Database connection configuration
/* Setting up the connection to the database. */

/* A function that is used to connect to the database and execute a query. */
var executeQuery = async function (query) {
  var config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };
  let pool = await sql.connect(config);
  const result = await pool.request().query(query);
  pool.close();
  return result["recordset"];
};
async function getCountries() {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT *
          FROM [bDB].[dbo].[Country]`;
      let data = await executeQuery(sqlQuery);

      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function getManagers() {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT *
            FROM [bDB].[dbo].[Manager]`;
      let data = await executeQuery(sqlQuery);

      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function getUsers() {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT *
            FROM [bDB].[dbo].[User]`;
      let data = await executeQuery(sqlQuery);

      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function getCryptosByCountryID(country_id) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT [id],[symbol],[name],[value] FROM [bDB].[dbo].[AllowedCryptosCountry] WHERE [CountryID]='${country_id}'`;
      let data = await executeQuery(sqlQuery);
      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function getCryptosByManagerID(manager_id) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT [id],[symbol],[name],[value] FROM [bDB].[dbo].[CryptosFromManagers] WHERE [manager_id]='${manager_id}'`;
      let data = await executeQuery(sqlQuery);
      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function getCryptosByUserID(user_id) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT [id],[symbol],[name],[value] FROM [bDB].[dbo].[CryptosFromUsers] WHERE [user_id]='${user_id}'`;
      let data = await executeQuery(sqlQuery);
      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
module.exports = {
  getCountries,
  getManagers,
  getUsers,
  getCryptosByCountryID,
  getCryptosByManagerID,
  getCryptosByUserID,
};
