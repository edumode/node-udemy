const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, default: "client", required: true},
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchases" }]
})

module.exports = mongoose.model("User", userSchema)