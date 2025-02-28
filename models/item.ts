import { model, models, Schema } from "mongoose"

const ItemSchema = new Schema({
    name: String,
    price: Number,
    img: String

}, { timestamps: true })

const Item = models.Item || model("Item", ItemSchema)
export default Item
