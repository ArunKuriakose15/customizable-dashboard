const { Client } = require("pg")
require("dotenv").config()
const {drizzle}=require("drizzle-orm/node-postgres")

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

client.connect()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

module.exports = {
        db: drizzle(client),
    };
