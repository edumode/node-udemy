const express = require('express')
const mongoose = require('mongoose')

const app = express()

const uridb = require("./global/uridb")

mongoose.connect(uridb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })

mongoose.connection.on("error", (err) => {
    console.log("> Error: ", err)
})

mongoose.connection.on("connected", (err, res) => {
    console.log("> DB connected")
})


app.listen(3000, () => {
    console.log("> Server running!")
})