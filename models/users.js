const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    profilePic: {
      picUrl: { type: String, default: "" },
      public_id: { type: String, default: "" }
    },
    userName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, default: "Client", required: true},
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchases" }]
})

module.exports = mongoose.model("User", userSchema)
