const Router = require('express-promise-router')
const {query, validationResult} = require('express-validator')

const db = require('../db')

const router = new Router()

router.get('/search',
    query('name').exists(),
    async (req, res) => {
        const {name} = req.query

        if (!validationResult(req).isEmpty())
            return res.status(400).send({message: "name isn't specified"})

        const response = await db.getProfs(name)
        let profs = response.hits.hits.map((hit) => hit._source)

        return res.status(200).send({profs})
    });

module.exports = router
