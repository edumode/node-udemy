const express = require('express')
const mongoose = require('mongoose')

const app = express()

const uri = require("./global/uridb")








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




