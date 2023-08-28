const {Client} = require('pg')


const dotenv = require('dotenv');
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Agora você pode usar as variáveis de ambiente em seu código
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;


const db = new Client({
    host: dbHost,
    user: dbUser,
    port: 5432,
    password: dbPassword,
    database: database
})


module.exports = db;