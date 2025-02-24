import mongoose from "mongoose"

const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const urlatlas = `mongodb+srv://${username}:${password}@cluster0.tadbt.mongodb.net/shopza999?retryWrites=true&w=majority`

export async function connectToDatabase() {
    if (mongoose.connection.readyState >= 1) return
    try {
        await mongoose.connect(urlatlas)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}
