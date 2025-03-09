import { NextRequest, NextResponse } from "next/server"
import Item from "@/models/item"
import { connectmongoDB } from "@/lib/monggoose"
import mongoose from "mongoose"
// import { RequestContext } from "next/server" // ⬅️ ใช้ RequestContext 

// 🔹 GET ITEM BY ID
export async function GET(req: NextRequest, context: any) {
    try {
        const itemId = context.params?.id

        console.log("Params:", context.params) // 🛠 Debugging

        if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        await connectmongoDB()
        const post = await Item.findById(itemId).lean()

        if (!post) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ post }, { status: 200 })
    } catch (error) {
        console.error("Error fetching item:", error)
        return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 })
    }
}

// 🔹 UPDATE ITEM BY ID
export async function PUT(req: NextRequest, context: any) {
    try {
        console.log("Params:", context.params) // 🛠 Debugging

        const itemId = context.params?.id
        if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        if (req.headers.get("content-type") !== "application/json") {
            return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
        }

        const { newTitle: title, newPrice: price, newDescription: description } = await req.json()
        await connectmongoDB()
        await Item.findByIdAndUpdate(itemId, { title, price, description })

        return NextResponse.json({ message: "Item updated" }, { status: 200 })
    } catch (error) {
        console.error("Error updating item:", error)
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
    }
}

// 🔹 DELETE ITEM BY ID
export async function DELETE(req: NextRequest, context: any) {
    try {
        console.log("Params:", context.params) // 🛠 Debugging

        const itemId = context.params?.id
        if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
        }

        await connectmongoDB()
        await Item.findByIdAndDelete(itemId)

        return NextResponse.json({ message: "Item deleted" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting item:", error)
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
    }
}
