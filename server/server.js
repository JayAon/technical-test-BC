var express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const bodyParser = require("body-parser");

var server = express();
server.use(bodyParser.json());
server.use(cors());
/* Loading the environment variables from the .env file. */
require("dotenv").config();
server.use("/", router);
/* Setting the limit of the json file to 1mb. */
server.use(express.json({ limit: "1mb" }));
/* A middleware that is used to parse the body of the request. */
server.use(express.urlencoded({ extended: false }));
server.listen(process.env.PORT, () => {
  console.log("Server opened");
});
