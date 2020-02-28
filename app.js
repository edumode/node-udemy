const express = require('express')
const mongoose = require('mongoose')

const app = express()

const uridb = require("./global/uridb")

mongoose.connect(uridb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(result => {
        console.log("> Connected!")
    })
    .catch(err => {
        console.log(err)
    })


const userSchema = mongoose.Schema({
    name: String
})

const placeSchema = mongoose.Schema({
    place: String
})

const musicSchema = mongoose.Schema({
    song: String
})


let User = mongoose.model('User', userSchema)
let Place = mongoose.model('Place', placeSchema)
let Music = mongoose.model('Music', musicSchema)

app.use('/user', () => {
    
    let newUser = User({
        name: 'Cesar Vasquez'
    })

    newUser.save (err => {
        if(err) throw err
        console.log("Created")
    })
})

app.use('/place', () => {
    
    let newUser = Place({
        name: 'Guatemala'
    })

    newUser.save (err => {
        if(err) throw err
        console.log("Created")
    })
})

app.use('/music', () => {
    
    let newUser = Music({
        song: 'Equus'
    })

    newUser.save (err => {
        if(err) throw err
        console.log("Created")
    })
})

app.use("/", (req, res, next) => {
    res.send("<h2>First</h2>")
})


app.listen(3000, () => {
    console.log("> Server running!")
})