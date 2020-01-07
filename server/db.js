const pgp = require('pg-promise')();
const connectionString = 'postgres://localhost:5432/inner_circle_db';
const db = pgp(connectionString);
module.exports = db;
