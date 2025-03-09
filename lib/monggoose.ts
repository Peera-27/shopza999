import mongoose from "mongoose"

const username = process.env.mongo_user
const password = process.env.mongo_password
const dbName = "shopza999"
const urlAtlas = `mongodb+srv://${username}:${password}@cluster0.tadbt.mongodb.net/${dbName}?retryWrites=true&w=majority`

let isConnected = false

export async function connectmongoDB() {
    if (isConnected) {
        console.log("Already connected to MongoDB")
        return
    }

    try {
        await mongoose.connect(urlAtlas, {
            dbName,
        })
        isConnected = true
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        throw new Error("MongoDB connection failed")
    }
}
