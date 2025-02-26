import mongoose, { Schema } from "mongoose"

const SchemaUser = new Schema({
    name: {
        type: String,
        required: [true, 'กรุณากรอกชื่อผู้ใช้']
    },
    password: {
        type: String,
        required: [true, 'กรุณากรอกรหัสผ่าน']
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'กรุณากรอกอีเมล'],
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