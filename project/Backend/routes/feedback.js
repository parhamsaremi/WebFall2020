const Router = require('express-promise-router')
const { param, validationResult } = require('express-validator')

const db = require('../db')

const router = new Router()

/**
 * get comments related to the prof with the given id
 */
router.get('/:id',
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
 * post a feedback
 */
router.post('/:id', async (req, res) => {
    const { id: profId } = req.params
    const { comment } = req.body;

    // TODO either text can be null or other fields (not both)
    // TODO add other fields

    await db.query("INSERT INTO comments (comment, prof_id, user_email, created_at) "
        + "VALUES ($1, $2, $3, current_date)", [comment, profId, req.user.email]);

    return res.sendStatus(204);
});

module.exports = router
