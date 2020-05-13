const express = require("express")
const router = express.Router()
const multer = require("multer")
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const tokenMdlw = require("./../middleware/jwtVerify")

const usersController = require("./../controllers/users.js")

cloudinary.config({
  cloud_name: "cesarvasz",
  api_key: 838274235554828,
  api_secret: "kbpybNMNCJJBkXbGKw7EHOxAsUg"
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "wearin",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

router.post("/createUser", usersController.createUser)
router.post("/login", usersController.loginUser)
router.get("/getUsers", tokenMdlw.verifyToken, usersController.getUsers)
router.put("/updateUser/:userId", usersController.updateUser)
router.put("/uploadProfilePicture", parser.single("file"), usersController.uploadProfilePicture)
router.delete("/deleteUser/:userId", usersController.deleteUser)

module.exports = router
