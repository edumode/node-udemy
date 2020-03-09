const mongoose = require("mongoose")
const Schema = moongoose.Schema

const productSchema = new Schema({
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: [{ type: String, required: true }],
    stock: { type: Number, required: true },
    gallery: [{ type: String, required: false }],
    active: { type: Boolean, required: true }
})

module.exports = mongoose.model("Product", productSchema)