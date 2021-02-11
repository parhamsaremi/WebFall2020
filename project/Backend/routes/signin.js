const jwt = require("jsonwebtoken");
const Router = require('express-promise-router')
const {body, validationResult} = require('express-validator')
const db = require('../db')

const router = new Router()

router.post('/',
    body('email').isEmail(),
    // body('password').isLength({min: 5}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        let {email, password} = req.body;

        const {rows} = await db.query("SELECT email FROM users WHERE email = $1"
            + "AND password = crypt($2, password)", [email, password])
        if (!rows.length)
            return res.status(401).send({message: 'wrong email or password.'})

        let token = jwt.sign({email, isAdmin: false}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
        res.status(200).send({token: `Bearer ${token}`})
    });

router.post('/admin', async (req, res) => {
    if (Object.keys(req.body).length !== 2)
        return res.status(400).send({message: 'Request Length should be 2'})

    let {username, password} = req.body;

    const {rows} = await db.query("SELECT username FROM admins WHERE username = $1"
        + "AND password = crypt($2, password)", [username, password])
    if (!rows.length)
        return res.status(401).send({message: 'wrong username or password.'})

    let token = jwt.sign({username, isAdmin: true}, process.env.TOKEN_SECRET, {expiresIn: '2h'})
    res.status(200).send({token: `Bearer ${token}`})
});

module.exports = router
