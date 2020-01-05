const pgp = require('pg-promise')();
const connectionString = ''
const db = pgp(connectionString)

module.exports = db