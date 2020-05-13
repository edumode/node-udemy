const express = require("express")
const Router = express.Router()

const contactController = require("./../controllers/contact")

Router.post("/saveComment", contactController.saveComment)

module.exports = Router
