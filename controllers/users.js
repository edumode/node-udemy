const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: "cesarvasz",
  api_key: 838274235554828,
  api_secret: "kbpybNMNCJJBkXbGKw7EHOxAsUg"
});


const Users = require("./../models/users")
const secret = require("./../global/jwt_secret")

const createUser = (req, res) => {

    var userToCreate = {
        userName: req.body.userName,
        email: req.body.email
    }

    if(!userToCreate.userName){
        return res.send({ message: "Provide your name" })
    }
    if(!userToCreate.email){
        return res.send({ message: "Provide an email address" })
    }
    if(!req.body.password){
        return res.send({ message: "Provide a password" })
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

                    res.status(200).send({ message: "User created successfully! Please, login with your credentials", user})
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
        .populate({
          path: "purchases",
          options: {
            sort: { "purchaseDate": -1 }
          }
        })
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

                    user[0].password =  undefined

                    res.status(200).send({ message: "Succeeded", user: user[0], token, logged: true })
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

//Upload image handler function
function handleProfileImg(res, userId, profilePic){
  Users.findByIdAndUpdate(userId, {profilePic: profilePic}, (err, picUpdated) => {
    if(err) { res.status(404).send({ err }) }

    return res.status(200).send({ message: "Profile picture updated", success: true, profilePic})
  })
}
//Upload image PUT method function
const uploadProfilePicture = (req, res) =>{

  var userId = req.body.id
  var public_id = req.body.public_id

  var profilePic = {
    picUrl: req.file.secure_url,
    public_id: req.file.public_id
  }

  if(public_id){
    cloudinary.v2.uploader.destroy(public_id, function(err, result){
        if(err) { res.status(404).send({ err }) }

        handleProfileImg(res, userId, profilePic)
      })
  }else{
    handleProfileImg(res, userId, profilePic)
  }

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
    deleteUser,
    uploadProfilePicture
}
