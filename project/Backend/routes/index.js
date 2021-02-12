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

        if (req.url.includes('admin') && !user.isAdmin)
            return res.status(401).send({message: 'not authorized as admin'})

        req.user = user
        next()
    })
}

inputCheck = (req, res, next) => {
    const input = [].concat(Object.values(req.params)).concat(Object.values(req.query)).concat(Object.values(req.body))
    const illegalTerms = [' union ', '--', ';', '<', '&', '>']
    for (let item of input)
        for (let term of illegalTerms)
            if (item.includes(term))
                return res.status(400).send({message: 'input contains illegal chars or terms'})
    
    next()
}

module.exports = app => {
    app.use(inputCheck)
    app.use('/api/signup', signUpRouter);
    app.use('/api/feedback', authenticate, feedbackRouter);
    app.use('/api/admin', authenticate, adminRouter);
    app.use('/api/profs', profRouter);
    app.use('/api/signin', signInRouter);
}
