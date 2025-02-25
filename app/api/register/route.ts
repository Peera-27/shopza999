import { connectToDatabase } from "@/lib/monggoose"
import { User } from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const body = await req.json()

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!body.username || !body.email || !body.password) {
            return NextResponse.json(
                { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
                { status: 400 }
            )
        }

        // สร้างข้อมูลผู้ใช้
        const userData = {
            username: body.username,
            email: body.email,
            password: body.password,
            phonenumber: body.phonenumber ? parseInt(body.phonenumber) : undefined,
            location: body.location,
            date: new Date()
        }

        const user = await User.create(userData)

        const userResponse = user.toObject()
        delete userResponse.password

        return NextResponse.json(userResponse, { status: 201 })
    }
    catch (error) {
        console.error('เกิดข้อผิดพลาด:', error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }
        )
    }
}