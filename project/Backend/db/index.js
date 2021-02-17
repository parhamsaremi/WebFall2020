const PostgresPool = require('pg').Pool
const ElasticClient = require('elasticsearch').Client

const pool = new PostgresPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const client = new ElasticClient({
    host: process.env.ELASTIC_HOST,
    // log: process.env.ELASTIC_LOG,
});

const getProfs = (name) => client.search({
    index: 'profs',
    body: {
        query: {
            match: {
                name: {
                    query: name,
                    fuzziness: 1
                }
            }
        }
    }
});

const addProf = (name, imagePath, id) => client.index({
    index: 'profs',
    body: {
        "id": id,
        "name": name,
        "imagePath": imagePath,
    }
}, (err, resp, status) => {
    console.log(resp);
});

module.exports = {
    query: (text, params = []) => pool.query(text, params),
    getProfs,
    addProf
}
