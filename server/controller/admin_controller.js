const database = require("../model/admin_database");

async function getCountries(req, res, next) {
  const countryID = req.body.country;
  try {
    const countries = await database.getCountries();
    res.status(200).send(countries);
  } catch (error) {
    res.status(500).send();
  }
}
async function getManagers(req, res, next) {
  const countryID = req.body.country;
  try {
    const managers = await database.getManagers();
    res.status(200).send(managers);
  } catch (error) {
    res.status(500).send();
  }
}
async function getUsers(req, res, next) {
  const countryID = req.body.country;
  try {
    const users = await database.getUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send();
  }
}
async function getCryptosByCountryID(req, res, next) {
  const id = req.body.id;
  try {
    const cryptos = await database.getCryptosByCountryID(id);
    res.status(200).send({ cryptos });
  } catch (error) {
    res.status(500).send();
  }
}
async function getCryptosByManagerID(req, res, next) {
  const id = req.body.id;
  try {
    const cryptos = await database.getCryptosByManagerID(id);
    res.status(200).send({ cryptos });
  } catch (error) {
    res.status(500).send();
  }
}
async function getCryptosByUserID(req, res, next) {
  const id = req.body.id;
  try {
    const cryptos = await database.getCryptosByUserID(id);
    res.status(200).send({ cryptos });
  } catch (error) {
    res.status(500).send();
  }
}
module.exports = {
  getCountries,
  getManagers,
  getUsers,
  getCryptosByCountryID,
  getCryptosByManagerID,
  getCryptosByUserID,
};
