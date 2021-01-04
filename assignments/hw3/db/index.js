const Pool = require('pg').Pool

const pool = new Pool({
    user: 'hw3',
    host: 'localhost',
    database: 'api',
    password: 'hw3-pass',
    port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}