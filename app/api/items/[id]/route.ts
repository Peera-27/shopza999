import { connectmongoDB } from "@/lib/monggoose"
import Item from "@/models/item"
import { NextResponse } from "next/server"



export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const itemId = (await params).id
        await connectmongoDB()
        const post = await Item.findById(itemId).lean() // เพิ่ม lean() เพื่อให้ Query เร็วขึ้น

        if (!post) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ post }, { status: 200 })
    } catch (error) {
        console.error("Error fetching item:", error)
        return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const itemId = (await params).id
        const { newname: name, newimage: image, newprice: price } = await request.json()

        await connectmongoDB()
        const updatedItem = await Item.findByIdAndUpdate(itemId, { name, image, price }, { new: true }).lean()

        if (!updatedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Item updated", item: updatedItem }, { status: 200 })
    } catch (error) {
        console.error("Error updating item:", error)
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const itemId = await (await params).id
        console.log("Deleting item with ID:", itemId)

        if (!itemId) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 })
        }

        await connectmongoDB()
        const deletedItem = await Item.findByIdAndDelete(itemId).lean()

        if (!deletedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Item deleted" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting item:", error)
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
    }
}