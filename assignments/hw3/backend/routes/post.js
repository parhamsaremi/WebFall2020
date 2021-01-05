const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

router.get('/', async (req, res) => {
    const {rows} = await db.query('SELECT * FROM posts')

    res.status(200).send({posts: rows})
});

module.exports = router
