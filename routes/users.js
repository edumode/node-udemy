const express = require("express")
const router = express.Router()

const tokenMdlw = require("./../middleware/jwtVerify")

const usersController = require("./../controllers/users.js")

router.post("/createUser", usersController.createUser)
router.post("/login", usersController.loginUser)
router.get("/getUsers", tokenMdlw.verifyToken, usersController.getUsers)
router.put("/updateUser/:userId", usersController.updateUser)
router.delete("/deleteUser/:userId", usersController.deleteUser)

module.exports = router