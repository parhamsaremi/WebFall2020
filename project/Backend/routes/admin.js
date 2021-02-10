const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const isNumeric = (value) => /^-?\d+$/.test(value);

router.get('/unconfirmed', async (req, res) => {

    const { rows: comments } = await db.query("SELECT id, comment FROM comments WHERE confirmed = FALSE")

    return res.status(200).send({ comments })
});

router.delete('/feedback/:id', async (req, res) => {
    const { id: commentId } = req.params
    
    if (!isNumeric(commentId))
        return res.status(400).send({ message: 'comment id is not valid' })

    await db.query("DELETE FROM comments WHERE id = $1", [commentId]);

    return res.sendStatus(204);
});

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
