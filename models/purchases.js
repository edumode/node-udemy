const mongoose = require("mongoose")
const Schema = mongoose.Schema

const purchasesSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    purchaseDate: { type: Date.now, required: true },
    productCodes: [],
    totalPrice: { type: Number, required: true}
})

module.exports = mongoose.model("Purchases", purchasesSchema)