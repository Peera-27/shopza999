import { connectmongoDB } from "@/lib/monggoose"
import Item from "@/models/item"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        await connectmongoDB()
        const { name, img, price } = await req.json()
        if (!name || !img || !price) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }
        await Item.create({ name, img, price })
        return NextResponse.json({ message: "Item added successfully" }, { status: 200 })
    } catch (error) {
        console.error("Error adding item", error)
        return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
    }
}
export async function GET() {
    try {
        await connectmongoDB()
        const items = await Item.find()
        return NextResponse.json({ items }, { status: 200 })
    } catch (error) {
        console.error("Error fetching items", error)
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 })
    }
}