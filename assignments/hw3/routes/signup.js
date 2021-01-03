const express = require('express');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/', function (req, res, next) {
    res.status(201)
        .send(jwt.sign({username: req.body.username}, process.env.TOKEN_SECRET, {expiresIn: '1h'}));
});

module.exports = router;
