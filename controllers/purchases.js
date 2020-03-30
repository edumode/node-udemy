const User = require("./../models/users")
const Purchase = require("./../models/purchases")

const addPurchase = (req, res) => {

    var purchaseInfo = req.body

    var totalPrice = 0

    for(var i = 0; i < purchaseInfo.productCodes.length; i++){
        totalPrice = (purchaseInfo.productCodes[i].quantity * purchaseInfo.productCodes[i].unitPrice) + totalPrice
    }

    purchaseInfo.totalPrice = totalPrice

    var purchase = new Purchase( purchaseInfo )

    purchase.save((err, purchase) => {
        if(err) { return res.send(err) }

        User.findByIdAndUpdate(purchaseInfo.userID,{
                $push: {"purchases": purchase._id}
            },
            function(err, updated) {
                if(err) { return res.send(err) }

                return res.status(200).send({ message: "Purchase completed", purchase })
            }
        )
    })
}

module.exports = {
    addPurchase
}