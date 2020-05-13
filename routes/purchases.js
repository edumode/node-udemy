const express = require("express")
const Router = express.Router()

const tokenMdlw = require("./../middleware/jwtVerify")

const purchaseController = require("./../controllers/purchases")

Router.post("/addPurchase", purchaseController.addPurchase )
Router.get("/getPurchases", tokenMdlw.verifyToken, purchaseController.getPurchases )

module.exports = Router
