const mongoose = require("mongoose")
const Schema = mongoose.Schema

const contactSchema = new Schema({
  userId: { type: String, required: false },
  userName: { type: String, required: true },
  email: { type: String, required: true},
  comment: { type: String, required: true},
  date: { type: Date, required: true, default: Date.now()},
  read: { type: Boolean, required: true, default: false}
})

module.exports = mongoose.model("Contact", contactSchema)
