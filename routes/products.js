const express = require("express")
const Router = express.Router()
const multer = require("multer")
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const productsController = require("./../controllers/products")

cloudinary.config({
  cloud_name: "cesarvasz",
  api_key: 838274235554828,
  api_secret: "kbpybNMNCJJBkXbGKw7EHOxAsUg"
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "wearin/shop",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

Router.post("/createProduct", parser.array("files"),productsController.createProduct)
Router.get("/getProduct/:itemToFind", productsController.getProducts)
Router.get("/getAllProducts", productsController.getAllProducts)
Router.get("/getSingleProduct/:productCode", productsController.getSingleProduct)
Router.put("/updateProduct/:productId", productsController.updateProduct)
Router.delete("/deleteProduct/:productId", productsController.deleteProduct)

module.exports = Router
