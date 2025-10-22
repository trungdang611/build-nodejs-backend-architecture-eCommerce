"use strict";

const express = require("express");
const router = express.Router();

//check api key

//check permission

// init routes
router.use("/v1/api", require("./access"));

module.exports = router;
