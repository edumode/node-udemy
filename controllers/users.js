const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Users = require("./../models/users")
const secret = require("./../global/jwt_secret")

const createUser = (req, res) => {

    var userToCreate = {
        userName: req.body.userName,
        email: req.body.email
    } 

    Users.find({email: req.body.email}, (err, user) => {
        if(err) { return res.status(404).send({ err }) }

        if(user.length > 0){ 
                res.status(403).send({ message: "User already exists" })
            } else {
            
            bcrypt.hash(req.body.password, 10, function(err, hash){
                userToCreate.password = hash
                var newUser = new Users(userToCreate)

                newUser.save(function(err, user){
                    if(err) return console.log(err)

                    res.status(200).send({ message: "User created successfully!", user})
                })
            })
        }
    })
}

const loginUser = (req, res) => {
    var userEmail = req.body.email
    var password = req.body.password

    if(!userEmail){
        return res.send({ message: "Provide an email address" })
    }

    Users.find({email: userEmail})
        .populate("purchases")
        .exec((err, user) => { 
            if(err) { return res.status(404).send({ err }) }
            if(user.length === 0) { return res.status(404).send({ message: "User not found" }) }
           
            bcrypt.compare(password, user[0].password,  function(err, match){
                if(match){
                    const payload = {
                        check:  true
                    }
            
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 144444
                    }) 
            
                    res.status(200).send({ message: "Logged successfully", user: user[0], token })
                }else{
                    return res.status(404).send({message: "Incorrect Password", err})
                }
            })
    
        })
}

const getUsers = (req, res) => {
    Users.find((err, users) => {
        if(err) { res.status(404).send({ err }) }

        res.status(200).send({ message: "Users retreived!", users})
    })
}

const updateUser = function(req, res){
    var userId = req.params.userId
    var toUpdate = req.body

    Users.findByIdAndUpdate(userId, toUpdate, (err, userUpdated) => {
        if(err) { res.status(404).send({ err }) }

        res.status(200).send({ message: "User updated", userUpdated})
    })
}

const deleteUser = function(req, res){
    var userId = req.params.userId

    Users.findByIdAndRemove(userId, (err, userDeleted) => {
        if(err) { res.status(404).send({ err }) }

        res.status(200).send({ message: "User deleted", userDeleted})
    })
}


module.exports = {
    createUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser
}