const jwt = require("jsonwebtoken");
const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// router.get('/:id', async (req, res) => {
//     const {id} = req.params

router.use('/', async (req, res) => {  // TODO clean up the duplicate code
    if (req.method !== 'POST')
        return res.status(405).send({ message: 'Only `Post` Method is Valid' })

    if (Object.keys(req.body).length < 2)
        return res.status(400).send({ message: 'Request Length should be 2' })

    let { email, password } = req.body;

    if (!re.test(String(email).toLowerCase()))
        return res.status(400).send({ message: 'filed `email` is not valid' })

    const { rows } = await db.query("SELECT ID FROM users WHERE email = $1"
        + "AND password = crypt($2, password)", [email, password])
    if (!rows.length)
        return res.status(401).send({ message: 'wrong email or password.' })

    let token = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    res.status(200).send({ token: `Bearer ${token}` })
});

module.exports = router
