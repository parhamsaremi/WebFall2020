const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const isNum = (value) => /^\d+$/.test(value);
const checkTitle = (title) => /^.+$/.test(title);
const checkContent = (content) => /^.+$/.test(content);

router.get('/user/crud/:id?', async (req, res) => {
    const { id } = req.params

    if (!id) { // feature :)
        const { rows: users } = await db.query("SELECT id, email, created_at FROM users WHERE email = $1", [req.user.email])
        if (!users.length) {
            return res.sendStatus(404) // to avoid internal error
        }
        return res.status(200).send({ user: users[0] })
    }

    if (!isNum(id))
        return res.status(400).send({ message: 'url id is not valid' })

    const { rows: users } = await db.query("SELECT id, email, created_at FROM users WHERE ID = $1", [id])
    if (!users.length)
        return res.sendStatus(404) // to avoid internal error

    if (users[0].email !== req.user.email)
        return res.status(401).send({ message: 'permission denied.' })

    res.status(200).send({ user: users[0] })
});

router.post('/post/crud', async (req, res) => {
    if (Object.keys(req.body).length !== 2) {
        return res.status(400).send({ message: 'Request Length should be 2' });
    }

    const { title, content } = req.body;

    if (!checkTitle(title)) {
        return res.status(400).send({ message: 'filed `title` is not valid' });
    }

    if (!checkContent(content)) {
        return res.status(400).send({ message: 'filed `content` is not valid' });
    }

    const { rows: users } = await db.query('SELECT id FROM users WHERE email=$1', [req.user.email]);

    let creatorId = users[0].id;
    await db.query("INSERT INTO posts (title, content, created_by, created_at) VALUES"
        + "($1, $2, $3, current_date)", [title, content, creatorId]);

    const { rows: result } = await db.query("SELECT ID FROM posts "
        + "WHERE title = $1 AND content = $2 AND created_by = $3", [title, content, creatorId]);

    let id = result[result.length - 1].id
    return res.status(201).send({ id });
});

router.put('/post/crud/:id?', async (req, res) => {
    if (Object.keys(req.body).length !== 2) {
        return res.status(400).send({ message: 'Request Length should be 2' });
    }

    const { id } = req.params;

    if (!isNum(id)) {
        return res.status(400).send({ message: 'url id is not valid' });
    }

    const { rows: posts } = await db.query('SELECT * FROM posts WHERE ID=$1', [id]);

    if (!posts.length) {
        return res.status(404).send({ message: 'no post found with given id' });
    }

    const { rows: users } = await db.query('SELECT id FROM users WHERE email=$1', [req.user.email]);

    let userId = users[0].id;
    let { created_by: postCreatorId } = posts[0];
    if (postCreatorId !== userId) {
        return res.status(401).send({ message: 'permission denied' });
    }

    const { title, content } = req.body;

    if (!checkTitle(title)) {
        return res.status(400).send({ message: 'filed `title` is not valid' });
    }

    if (!checkContent(content)) {
        return res.status(400).send({ message: 'filed `content` is not valid' });
    }

    await db.query('UPDATE posts SET title=$1, content=$2 WHERE ID=$3', [title, content, id]);

    return res.sendStatus(204);
});

router.delete('/post/crud/:id?', async (req, res) => {
    const { id } = req.params;

    if (!isNum(id)) {
        return res.status(400).send({ message: 'url id is not valid' });
    }

    const { rows: posts } = await db.query('SELECT * FROM posts WHERE ID=$1', [id]);

    if (!posts.length) {
        return res.status(404).send({ message: 'no post found with given id' });
    }

    const { rows: users } = await db.query('SELECT id FROM users WHERE email=$1', [req.user.email]);

    const userId = users[0].id;

    let { created_by: postCreatorId } = posts[0];
    if (postCreatorId !== userId) {
        return res.status(401).send({ message: 'permission denied' });
    }

    await db.query('DELETE FROM posts WHERE ID=$1', [id]);

    return res.sendStatus(204);
});

router.get('/post/crud/:id?', async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        const { rows: users } = await db.query('SELECT id FROM users WHERE email=$1', [req.user.email]);
        let creatorId = users[0].id;

        const { rows: posts } = await db.query('SELECT * FROM posts WHERE created_by=$1', [creatorId]);
        return res.status(200).send({ posts })
    } else {
        if (!isNum(id)) {
            return res.status(400).send({ message: 'url id is not valid' });
        }

        const { rows } = await db.query('SELECT * FROM posts WHERE ID=$1', [id]);

        if (!rows.length) {
            return res.status(404).send({ message: 'no post found with given id' });
        }

        return res.status(200).send({ post: rows[0] });
    }
});

module.exports = router
