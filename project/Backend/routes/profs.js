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
router.get('/info/:id',
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
 * get comments related to the prof with the given id
 */
router.get('/comments/:id',
    param('id').isInt(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const { id: profId } = req.params

        const { rows: comments } = await db.query("SELECT name, comment, created_at FROM "
            + "comments INNER JOIN users ON comments.user_email = users.email "
            + "WHERE prof_id = $1", [profId])

        return res.status(200).send({ comments })
    });

/**
 * returns a prof's average ratings
 */
router.get('/ratings/:id',
    param('id').isInt(),
    async (req, res) => {
        const { id: profId } = req.params

        if (!validationResult(req).isEmpty())
            return res.status(400).send({ message: "profId isn't correct" })

        // TODO add columns to replace * with their avg and count in the following query
        const { rows: comments } = await db.query("SELECT * FROM comments "
            + "WHERE PROF_ID = $1 AND CONFIRMED = TRUE", [profId])

        const { rows: ratingsRows } = await db.query("SELECT * FROM ratings "
            + "WHERE PROF_ID = $1", [profId])

        return res.status(200).send({ comments, ratings: ratingsRows[0] })
    });

/**
 * posts a prof request
 */
router.post('/request', async (req, res) => {
    if (Object.keys(req.body).length !== 3)
        return res.status(400).send({ message: 'Request Length should be 3' })

    const { name, uni, description } = req.body
    const { rows: info } = await db.query("INSERT INTO requests (name, uni, description) "
        + "VALUES ($1, $2, $3)", [name, uni, description])

    return res.status(200).send({ info })
});

module.exports = router
