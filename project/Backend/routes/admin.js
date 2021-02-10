const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const isNumeric = (value) => /^-?\d+$/.test(value);

/**
 * returns the comments which are not confirmed/declined yet
 */
router.get('/unconfirmed', async (req, res) => {

    const { rows: comments } = await db.query("SELECT id, comment FROM comments WHERE confirmed = FALSE")

    return res.status(200).send({ comments })
});

/**
 * deletes the comment with given id
 */
router.delete('/feedback/:id', async (req, res) => {
    const { id: commentId } = req.params
    
    if (!isNumeric(commentId))
        return res.status(400).send({ message: 'comment id is not valid' })

    await db.query("DELETE FROM comments WHERE id = $1", [commentId]);

    return res.sendStatus(204);
});

/**
 * if id is given, that commit will be confirmed,
 * else, all of them will be confirmed.
 */
router.put('/confirm/:id?', async (req, res) => {
    const { id: commentId } = req.params

    if (commentId === undefined) {
        await db.query("UPDATE comments SET confirmed = TRUE");
    } else {
        if (!isNumeric(commentId))
            return res.status(400).send({ message: 'comment id is not valid' })
        await db.query("UPDATE comments SET confirmed = TRUE WHERE id = $1", [commentId]);
    }
    return res.sendStatus(204);
});

module.exports = router
