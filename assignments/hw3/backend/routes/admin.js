const express = require('express');
const router = express.Router();

router.post('/user', (req, res, next) => {
    res.send('admin/user works!');
});

module.exports = router;