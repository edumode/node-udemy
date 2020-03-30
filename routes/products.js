const express = require("express")
const Router = express.Router()

const productsController = require("./../controllers/products")

Router.post("/createProduct", productsController.createProduct)
Router.get("/getProduct/:groupToFind/:itemToFind", productsController.getProducts)
Router.put("/updateProduct/:productId", productsController.updateProduct)
Router.delete("/removeProduct/:productId", productsController.deleteProduct)

module.exports = Router