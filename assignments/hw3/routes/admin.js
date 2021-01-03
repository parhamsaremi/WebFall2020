const express = require('express');
const router = express.Router();

router.post('/user', (req, res, next) => {
    res.status(201)
    res.send('admin/user works!');
});

module.exports = router;
