import { connect } from 'mongoose'

const MONGO_DB_URI = process.env.MONGO_DB_URI

let db;

export const connect = async () => {
    if (db) return;

    try {
        await connect(MONGO_DB_URI)
        db = true
    } catch (error) {
        throw error
    }
}