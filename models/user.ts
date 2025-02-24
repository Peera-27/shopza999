import { model, models, Schema } from "mongoose"

const SchemaUser = new Schema({
    username: {
        type: String,
        required: [true, 'กรุณากรอกชื่อผู้ใช้']
    },
    password: {
        type: String,
        required: [true, 'กรุณากรอกรหัสผ่าน']
    },
    phonenumber: {
        type: Number,
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
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'user',
    timestamps: true, // เพิ่ม createdAt และ updatedAt
    versionKey: false // ปิดการใช้งาน __v
})

export const User = models.user || model("user", SchemaUser)