import mongoose from "mongoose"

const username = process.env.mongo_user
const password = process.env.mongo_password
const urlatlas = `mongodb+srv://${username}:${password}@cluster0.tadbt.mongodb.net/shopza999?retryWrites=true&w=majority`

export async function connectToDatabase() {
    try {
        await mongoose.connect(urlatlas)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}
