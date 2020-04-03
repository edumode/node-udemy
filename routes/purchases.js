const express = require("express")
const Router = express.Router()

const purchaseController = require("./../controllers/purchases")

Router.post("/addPurchase", purchaseController.addPurchase )
Router.get("/getPurchases", purchaseController.getPurchases )

module.exports = Router