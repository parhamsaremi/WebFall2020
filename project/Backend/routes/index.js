const jwt = require("jsonwebtoken");

const signUpRouter = require('./signup');
const feedbackRouter = require('./feedback');
const adminRouter = require('./admin');
const profRouter = require('./profs');
const signInRouter = require('./signin');

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

adminAuth = (req, res, next) => {
    if (req.user.isAdmin)
        next()
    return res.status(401).send({message: 'not authorized as admin'})
}

sqlInjectionCheck = (req, res, next) => {
    /** check:
     *      req.params
     *      req.query
     *      req.body
     */
    next()
}

module.exports = app => {
    app.use(sqlInjectionCheck)
    app.use('/api/signup', signUpRouter);
    app.use('/api/feedback', authenticate, feedbackRouter);
    app.use('/api/admin', authenticate, adminAuth, adminRouter);
    app.use('/api/profs', profRouter);
    app.use('/api/signin', signInRouter);
}
