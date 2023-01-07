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

/**
 * VerifyUser() is an async function that returns a promise that resolves to the result of an SQL
 * query.
 * @param userName - The user name of the user to be verified.
 * @returns The result of the query.
 */
async function verifyUser(userName) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT * FROM [bDB].[dbo].[User] WHERE [name]='${userName}'`;
      let data = await executeQuery(sqlQuery);
      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * It takes a userID, queries the database for all the cryptos that user has, and returns the result.
 * @param userID - The user's ID
 * @returns An array of objects.
 */
async function getUserCryptos(userID) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT *
      FROM [bDB].[dbo].[CryptosFromUsers] WHERE [user_id] = '${userID}'`;
      let data = await executeQuery(sqlQuery);

      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * It takes a CountryID, queries the database for all the cryptos that country has available, and returns the result.
 * @param CountryID - The country's ID
 * @returns An array of objects.
 */
async function getAvailableCryptos(CountryID) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `SELECT *
      FROM [bDB].[dbo].[AllowedCryptosCountry] WHERE [CountryID] = '${CountryID}'`;
      let data = await executeQuery(sqlQuery);
      let result = JSON.parse(JSON.stringify(data));
      return resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * It takes two parameters, userID and cryptoID, and inserts them into a table called UserCrypto.
 * @param userID - 1
 * @param cryptoID - 1
 * @returns a promise.
 */
async function addCryptoUser(userID, cryptoID) {
  return new Promise(async function (resolve, reject) {
    console.log({ user: userID, cryptoID: cryptoID });
    try {
      let sqlQuery = `INSERT INTO [bDB].[dbo].[UserCrypto]([user_id],[crypto_id]) VALUES(${userID},${cryptoID})`;
      console.log(sqlQuery);
      await executeQuery(sqlQuery);
      return resolve(200);
    } catch (err) {
      reject(err);
    }
  });
}
async function deleteCryptoUser(userID, cryptoID) {
  return new Promise(async function (resolve, reject) {
    console.log({ user: userID, cryptoID: cryptoID });
    try {
      let sqlQuery = `DELETE FROM [bDB].[dbo].[UserCrypto] WHERE [user_id]='${userID}' AND [crypto_id]='${cryptoID}'`;
      console.log(sqlQuery);
      await executeQuery(sqlQuery);
      return resolve(200);
    } catch (err) {
      reject(err);
    }
  });
}

async function updateCryptoUser(userID, currentCryptoID, cryptoID) {
  return new Promise(async function (resolve, reject) {
    try {
      let sqlQuery = `UPDATE [bDB].[dbo].[UserCrypto] SET [user_id]='${userID}',[crypto_id]='${cryptoID}' WHERE ([user_id]='${userID}' AND [crypto_id]='${currentCryptoID}')`;
      console.log(sqlQuery);
      await executeQuery(sqlQuery);
      return resolve(200);
    } catch (err) {
      reject(err);
    }
  });
}
/* Exporting the function verifyUser so that it can be used in other files. */
module.exports = {
  verifyUser,
  getUserCryptos,
  getAvailableCryptos,
  addCryptoUser,
  deleteCryptoUser,
  updateCryptoUser,
};
