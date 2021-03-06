const User = require("./../models/users")
const Purchase = require("./../models/purchases")

const rn = require("random-number")

var gen = rn.generator({
    min:  100000,
    max:  999999,
    integer: true
  })


const addPurchase = (req, res) => {

    var purchaseInfo = req.body

    var purchaseNumber = gen()
    purchaseInfo.purchaseNumber = purchaseNumber

    var purchase = new Purchase( purchaseInfo )

    purchase.save((err, purchase) => {
        if(err) { return res.send(err) }

        User.findByIdAndUpdate(purchaseInfo.userID,{
                $push: {"purchases": purchase._id}
            },
            function(err, updated) {
                if(err) { return res.send(err) }

                return res.status(200).send({ message: "Purchase completed", purchase, success: true })
            }
        )
    })
}

const getPurchases = (req, res) => {

    Purchase.find()
            .populate("userID", "userName email")
            .exec((err, purchases) => {
                if(err) { return res.send(err) }

                return res.status(200).send({ purchases })
            })
}

module.exports = {
    addPurchase,
    getPurchases
}
