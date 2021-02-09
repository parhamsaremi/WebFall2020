const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

router.get('/feedback/:id', async (req, res) => {
    const { id: profId } = req.params

    if (!isNum(profId))
        return res.status(400).send({ message: 'prof id is not valid' })

    const { rows: comments } = await db.query("SELECT comment FROM comments WHERE prof_id = $1", [profId])
    return res.status(200).send({ comments })
});

router.post('/feedback/:id', async (req, res) => {
    const { id: profId } = req.params
    const { comment } = req.body;

    // TODO either text can be null or other fields (not both)
    // TODO add other fields

    await db.query("INSERT INTO comments (comment, prof_id, user_email, created_at) "
        + "VALUES ($1, $2, $3, current_date)", [comment, profId, req.user.email]);

    return res.sendStatus(204);
});

module.exports = router
