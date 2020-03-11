const Users = require("./../models/users")

const createUser = (req, res) => {

    var user = req.body
    
    var newUser = new Users(user)

    newUser.save(function(err, user){
        if(err) return console.error(err)

        res.status(200).send({ message: "User created successfully!", user})
    })
}

const loginUser = (req, res) => {
    var userId = req.body.userId

    Users.findById(userId, (err, user) => { 
        if(err) { res.status(404).send({ err }) }

        res.status(200).send({ message: "Logged successfully", user })
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