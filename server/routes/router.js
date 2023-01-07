var express = require("express");
/* Creating a new router object. */
var router = express.Router();
const controller = require("../controller/controller");
const admin_controller = require("../controller/admin_controller");
/* Creating a post request to the route /login. It is using the setLogin function from the controller. */
router.post("/login", controller.setLogin);
/* A post request to the route /test. It is using the checkToken middleware and then the getUserCryptos
function. */
router.post("/test", controller.checkToken, controller.getUserCryptos);
/* A post request to the route /countrycryptos. It is using the checkToken middleware and then the
getAvailableCryptos function. */
router.post(
  "/countrycryptos",
  controller.checkToken,
  controller.getAvailableCryptos
);
/* A post request to the route /addcrypto. It is using the checkToken middleware and then the
addCryptoUser function. */
router.post("/addcrypto", controller.checkToken, controller.addCryptoUser);
router.post(
  "/deletecrypto",
  controller.checkToken,
  controller.deleteCryptoUser
);
router.post(
  "/updatecrypto",
  controller.checkToken,
  controller.updateCryptoUser
);
router.post("/checktoken", controller.checkToken, controller.grantAccess);

router.post("/getcountries", admin_controller.getCountries);
router.post("/getmanagers", admin_controller.getManagers);
router.post("/getusers", admin_controller.getUsers);
router.post("/cryptocountries", admin_controller.getCryptosByCountryID);
router.post("/cryptomanager", admin_controller.getCryptosByManagerID);
router.post("/cryptouser", admin_controller.getCryptosByUserID);
module.exports = router;
