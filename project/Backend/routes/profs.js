const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

router.get('/search', async (req, res) => {
    const { name } = req.query
    if (name === undefined) {
        return res.status(400).send({ message: "name isn't specified" })
    }

    const response = await db.getProfs(name)
    let profs = response.hits.hits.map((hit) => hit._source)

    return res.status(200).send({ profs })
});

module.exports = router
