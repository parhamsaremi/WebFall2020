const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const isNum = (value) => /^\d+$/.test(value);

router.get('/user/crud/:id', async (req, res) => {
    const {id} = req.params

    if (!isNum(id))
        return res.status(400).send({message: 'url id is not valid'})

    const {rows: users} = await db.query("SELECT id, email, created_at FROM users WHERE ID = $1", [id])
    if (!users.length)
        return res.sendStatus(404) // to avoid internal error

    if (users[0].email !== req.user.email)
        return res.status(401).send({message: 'permission denied.'})

    res.status(200).send({user: users[0]})
});

module.exports = router
