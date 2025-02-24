import { model, models, Schema } from "mongoose"

const ItemSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    item: String,
    price: Number
}, { collection: 'test' })

export const Item = models.test || model("test", ItemSchema)
