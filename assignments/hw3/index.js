const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const router = require('./routes/router')

const app = express()
const port = 3000
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', router);
app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
