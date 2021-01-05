const jwt = require("jsonwebtoken");

const adminRouter = require('./admin');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const postRouter = require('./post');

authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send('JsonWebTokenError')

        req.user = user
        next()
    })
}

module.exports = app => {
    app.use('/api/admin', authenticate, adminRouter);
    app.use('/api/signup', signUpRouter);
    app.use('/api/signin', signInRouter);
    app.use('/api/post', postRouter);
}
