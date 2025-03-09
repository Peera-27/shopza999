import { connectmongoDB } from "@/lib/monggoose"
import Item from "@/models/item"
import { NextResponse, NextRequest } from "next/server"
// Removed RouteContext import as it is not exported from "next"

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        const itemId = context.params.id // ✅ ใช้ context.params
        await connectmongoDB()
        const post = await Item.findById(itemId)

        if (!post) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ post }, { status: 200 })
    } catch (error) {
        console.error("Error fetching items", error)
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        const itemId = context.params.id
        const { newname: name, newimage: image, newprice: price } = await req.json()
        await connectmongoDB()
        const updatedItem = await Item.findByIdAndUpdate(itemId, { name, image, price })

        if (!updatedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Item updated" }, { status: 200 })
    } catch (error) {
        console.error("Error editing item", error)
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        const itemId = context.params.id
        console.log("Deleting item with ID:", itemId)

        if (!itemId) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 })
        }

        await connectmongoDB()
        const deletedItem = await Item.findByIdAndDelete(itemId)

        if (!deletedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Item deleted" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting item:", error)
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
    }
}
