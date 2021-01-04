const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

router.use('/', async (req, res) => {
    if (req.method !== 'POST')
        return res.status(405).send({ message: 'Only `Post` Method is Valid' })

    if (Object.keys(req.body).length < 2)
        return res.status(400).send({ message: 'Request Length should be 2' })

    let { email, password } = req.body;

    if (!re.test(String(email).toLowerCase()))
        return res.status(400).send({ message: 'filed `email` is not valid' })

    if (password.length < 5)
        return res.status(400).send({ message: 'filed `password`.length should be gt 5' })

    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (rows.length)
        return res.status(409).send({ message: 'email already exist.' })

    await db.query('INSERT INTO users (email, created_at) VALUES ($1, current_date)', [email])
    res.status(201).send({ message: 'user has been created.' })
});

module.exports = router
