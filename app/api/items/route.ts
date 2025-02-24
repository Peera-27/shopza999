import { connectToDatabase } from "@/lib/monggoose"
import { Item } from "@/models/item"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        await connectToDatabase()
        const { searchParams } = new URL(request.url)
        const keyword = searchParams.get("keyword") || ""

        const items = await Item.find({
            item: { $regex: keyword, $options: "i" }
        })

        return NextResponse.json(items)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}
