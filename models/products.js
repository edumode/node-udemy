const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: String, required: true},
    gallery: [],
    active: { type: Boolean, required: true }
})

module.exports = mongoose.model("Products", productSchema)
