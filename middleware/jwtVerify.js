const jwt = require("jsonwebtoken")

const secret = require("../global/jwt_secret")

const verifyToken = (req, res, next) => {

    var token = req.headers["access-token"]
    

   if(token){
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                return res.send({ message: "Invalid authorization" })
            }else{
                req.decoded = decoded;
                next()
            }
        })
   }else{
       return res.send({ message: "Not authorized" })
   }
}

module.exports =  { verifyToken }
