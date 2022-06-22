const express = require("express");
const { register } = require("../controllers/users.controller");
const router = express.Router();

router.post("/register", register)

module.exports = router;