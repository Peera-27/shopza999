import { connectToDatabase } from "@/lib/monggoose"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    try {
        // เชื่อมต่อกับฐานข้อมูล
        await connectToDatabase()

        // รับข้อมูลจาก client
        const { email, password } = await req.json()

        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านในฐานข้อมูล
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 })
        }

        // ตรวจสอบว่า JWT_SECRET มีการตั้งค่าใน environment variable หรือไม่
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined")
        }

        // สร้าง JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        // ส่งข้อมูลกลับไปพร้อมกับ token และข้อมูลของผู้ใช้
        return NextResponse.json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        }, { status: 200 })

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}
