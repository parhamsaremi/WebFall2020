const db = require('../db')
const Router = require('express-promise-router')

const router = new Router()

const isNumeric = (value) => /^-?\d+$/.test(value);

/**
 * post a feedback
 */
router.post('/:id', async (req, res) => {
    const { id: profId } = req.params
    const { comment } = req.body;

    // TODO either text can be null or other fields (not both)
    // TODO add other fields
    // TODO if comment === '' then set confirmed = true

    await db.query("INSERT INTO comments (comment, prof_id, user_email) "
        + "VALUES ($1, $2, $3)", [comment, profId, req.user.email]);

    return res.sendStatus(204);
});

/**
 * returns the comments sent by user
 */
router.get('/', async (req, res) => {

    const { rows: comments } = await db.query("SELECT id, comment FROM comments WHERE "
        + "user_email = $1", [req.user.email])

    return res.status(200).send({ comments })
});

/**
 * deletes the comment with given id (only if it is one of his)
 */
router.delete('/:id', async (req, res) => {
    const { id: commentId } = req.params

    if (!isNumeric(commentId))
        return res.status(400).send({ message: 'comment id is not valid' })

    await db.query("DELETE FROM comments WHERE id = $1 AND user_email = $2", [commentId, req.user.email]);

    return res.sendStatus(204);
});

module.exports = router
