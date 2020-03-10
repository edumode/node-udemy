const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const userRoute = require("./routes/users.js")

const uri = require("./global/uridb")

app.use(bodyParser.urlencoded({ extended: true }));



app.use("/user", userRoute)



mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(result => {
        app.listen(3000, () => {
            console.log("> Server running!")
            console.log("> Connected!")
        })
    })
    .catch(err => {
        console.log(err)
    })




