const database = require("../model/database_model");
const jwt = require("jsonwebtoken");

/**
 * It takes a username and password, verifies the user, and returns a token.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
async function setLogin(req, res, next) {
  try {
    /* Getting the origin of the request. */
    console.log(req.body);
    var user = await database.verifyUser(req.body.username);
    if (user.length > 0) {
      let expires = Math.floor(new Date() / 1000) + 60 * 5;
      let payload = {
        id: user[0].id,
        country: user[0].country_id,
        exp: expires,
      };
      /* Creating a token with the payload and the JWT_KEY. */
      let token = jwt.sign(payload, process.env.JWT_KEY);
      res.status(200).send({
        token,
      });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
/**
 * If the request has an authorization header, verify the token and if it's valid, add the user's id
 * and country to the request body and call the next function.
 *
 * If the request doesn't have an authorization header, send a 403 response.
 *
 * If the token is invalid, send a 403 response.
 * @param req - the request object
 * @param res - the response object
 * @param next - The next middleware function in the stack.
 */
async function checkToken(req, res, next) {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_KEY,
      (err, payload) => {
        if (err) {
          res.sendStatus(403);
        } else {
          req.body.id = payload.id;
          req.body.country = payload.country;
          next();
        }
      }
    );
  } else {
    res.sendStatus(403);
  }
}
/**
 * If the request body is not empty, send a 200 status code.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
async function grantAccess(req, res, next) {
  if (req.body) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
}
/**
 * It takes a userID from the request body, and then uses that userID to query the database for the
 * user's cryptos.
 *
 * The database returns the cryptos, and then the function sends the cryptos back to the client.
 * @param req - the request object
 * @param res - the response object
 * @param next - A function to be called if the middleware function does not end the request-response
 * cycle.
 */
async function getUserCryptos(req, res, next) {
  if (req.body) {
    const userID = req.body.id;
    try {
      const cryptos = await database.getUserCryptos(userID);
      res.status(200).send({
        cryptos,
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}
/**
 * It gets the available cryptos for a given country.
 * @param req - The request object.
 * @param res - the response object
 * @param next - The next middleware function in the stack.
 */
async function getAvailableCryptos(req, res, next) {
  const countryID = req.body.country;
  try {
    const cryptos = await database.getAvailableCryptos(countryID);
    res.status(200).send({
      cryptos,
    });
  } catch (error) {
    res.send(500).send();
  }
}
/**
 * It takes a userID and a cryptoID, and adds the cryptoID to the userID's list of cryptos.
 * @param req - the request object
 * @param res - the response object
 * @param next - A function to be called if the middleware function does not end the request-response
 * cycle. If the current middleware function does not end the request-response cycle, it must call
 * next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
 */
async function addCryptoUser(req, res, next) {
  const userID = req.body.id;
  const cryptoID = req.body.cryptoid;
  try {
    const cryptos = await database.addCryptoUser(userID, cryptoID);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
}
async function deleteCryptoUser(req, res, next) {
  const userID = req.body.id;
  const cryptoID = req.body.cryptoid;
  try {
    const cryptos = await database.deleteCryptoUser(userID, cryptoID);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
}
async function updateCryptoUser(req, res, next) {
  const userID = req.body.id;
  const cryptoID = req.body.cryptoid;
  const currentCryptoID = req.body.currentCryptoID;
  try {
    const cryptos = await database.updateCryptoUser(
      userID,
      currentCryptoID,
      cryptoID
    );
    res.status(200).send();
  } catch {
    res.status(500).send();
  }
}
module.exports = {
  setLogin,
  checkToken,
  getUserCryptos,
  getAvailableCryptos,
  addCryptoUser,
  grantAccess,
  deleteCryptoUser,
  updateCryptoUser,
};
