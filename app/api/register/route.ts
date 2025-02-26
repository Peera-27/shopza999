import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { connectToDatabase } from "@/lib/monggoose"
import User from "@/models/user"

export async function POST(req) {
    try {
        const { name, email, phonenumber, password, location } = await req.json()
        const hash = await bcrypt.hash(password, 10)

        await connectToDatabase()


        await User.create({ name, email, phonenumber, password: hash, location })
        return NextResponse.json({ message: "Registration successful" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong 🥵🥵🥵",
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 })
    }
}