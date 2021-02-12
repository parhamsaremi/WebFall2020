const Router = require('express-promise-router')
const { query, param, validationResult } = require('express-validator')

const db = require('../db')

const router = new Router()

/**
 * returns the results of fuzzy search on profName
 */
router.get('/search',
    query('name').exists(),
    async (req, res) => {
        const { name } = req.query

        if (!validationResult(req).isEmpty())
            return res.status(400).send({ message: "name isn't specified" })

        const response = await db.getProfs(name)
        let profs = response.hits.hits.map((hit) => hit._source)

        return res.status(200).send({ profs })
    });

/**
 * returns prof info
 */
router.get('/:id',
    param('id').isInt(),
    async (req, res) => {
        const { id: profId } = req.params

        if (!validationResult(req).isEmpty())
            return res.status(400).send({ message: "profId isn't correct" })

        const { rows: info } = await db.query("SELECT fa_name, uni, image_path "
            + "FROM profs WHERE ID = $1", [profId])

        return res.status(200).send({ info })
    });

/**
 * returns a prof's average ratings
 */
router.get('/:id',
    param('id').isInt(),
    async (req, res) => {
        const { id: profId } = req.params

        if (!validationResult(req).isEmpty())
            return res.status(400).send({ message: "profId isn't correct" })

        // TODO add columns to replace * with their avg and count in the following query
        const { rows: info } = await db.query("SELECT * FROM comments "
            + "WHERE PROF_ID = $1 AND CONFIRMED = TRUE", [profId])

        return res.status(200).send({ info })
    });

module.exports = router
