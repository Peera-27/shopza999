import { connectmongoDB } from "@/lib/monggoose"
import Item from "@/models/item"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const itemId = (await params).id // await params ก่อนเข้าถึง id
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
        const itemId = (await params).id
        const { newname: name, newimage: image, newprice: price } = await req.json()
        await connectmongoDB()
        await Item.findByIdAndUpdate(itemId, { name, image, price })
        return NextResponse.json({ message: "Item updated" }, { status: 200 })
    } catch (error) {
        console.error("Error editing item", error)
    }

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        console.log("Deleting item with ID:", id) // ✅ Debug จุดนี้

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 })
        }

        await connectmongoDB()
        const deletedItem = await Item.findByIdAndDelete(id)

        if (!deletedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Item deleted" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting item:", error)
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
    }
}