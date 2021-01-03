const express = require('express');
const jwt = require("jsonwebtoken");

const adminRouter = require('./admin');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const postRouter = require('./post');

const router = express.Router();

authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send('JsonWebTokenError')

        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}

router.use('/admin', authenticate, adminRouter);
router.use('/signup', signUpRouter);
router.use('/signin', signInRouter);
router.use('/post', postRouter);

module.exports = router;
