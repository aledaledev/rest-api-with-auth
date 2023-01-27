import {config} from 'dotenv'

config()

export const PORT = process.env.PORT

export default {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT
}