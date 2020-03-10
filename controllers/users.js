const Users = require("./../models/users")

const createUser = (req, res) => {

    var user = req.body
    
    var newUser = new Users(user)

    newUser.save(function(err, user){
        if(err) return console.error(err)

        res.status(200).send({ message: "User created successfully!", user})
    })
}

module.exports = {
    createUser
}