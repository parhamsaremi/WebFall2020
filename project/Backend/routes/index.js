const jwt = require("jsonwebtoken");

const signUpRouter = require('./signup');
const feedbackRouter = require('./feedback');

authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(401).send({message: 'invalid token'})

        req.user = user
        next()
    })
}

module.exports = app => {
    app.use('/api/signup', signUpRouter);
    app.use('/api/feedback', /* authenticate, */ feedbackRouter);
}
