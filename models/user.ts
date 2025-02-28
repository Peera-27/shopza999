import mongoose, { Schema } from "mongoose"

const SchemaUser = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    location: {
        type: String,
        required: false
    }, role: {
        type: String,
        required: false,
        default: "user"
    }

}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', SchemaUser)
export default User