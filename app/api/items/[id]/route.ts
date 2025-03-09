import { connectmongoDB } from "@/lib/monggoose"
import Item from "@/models/item"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const itemId = params.id // ✅ ใช้ params ตรงๆ ไม่ต้อง await
        await connectmongoDB()
        const post = await Item.findOne({ _id: itemId })

        if (!post) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ post }, { status: 200 })
    } catch (error) {
        console.error("Error fetching items", error)
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const itemId = params.id // ✅ ใช้ params ตรงๆ
        const { newname: name, newimage: image, newprice: price } = await req.json()
        await connectmongoDB()
        const updatedItem = await Item.findByIdAndUpdate(itemId, { name, image, price })

        if (!updatedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Item updated" }, { status: 200 })
    } catch (error) {
        console.error("Error editing item", error)
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 }) // ✅ Return error response
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const itemId = params.id
        console.log("Deleting item with ID:", itemId) // ✅ Debug จุดนี้

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
