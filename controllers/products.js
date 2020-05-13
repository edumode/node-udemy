const Products = require("./../models/products")
const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: "cesarvasz",
  api_key: 838274235554828,
  api_secret: "kbpybNMNCJJBkXbGKw7EHOxAsUg"
});

const createProduct = (req, res) => {

    var data = req.body
    var files = req.files

    data.gallery = files

    Products.find({productCode: data.productCode}, (err, product) => {
        if(err){ return res.send( { err } ) }

        if(product.length > 0){
            return res.status(403).send({ message: "Product already exists" })
        }else{
            var product = new Products(data)

            product.save(function(err, product){
                if(err) { return res.send({ message: "There was an error", err }) }

                res.status(200).send({ message: "Product created successfully", product, success: true})
            })
        }
    })
}

const getProducts = (req, res) => {

    var itemToFind = req.params.itemToFind

    Products.find({"category": itemToFind}, (err, product) => {
        if(err){ return res.status(404).send(err) }

        if(product.length > 0){
            return res.status(200).send({ product })
        }else{
            return res.status(404).send({ message: "Nothing was found" })
        }
    })
}

const getSingleProduct = (req, res) => {

    var productToFind = req.params.productCode

    Products.find({"productCode": productToFind}, (err, product) => {
        if(err){ return res.status(404).send(err) }

        if(product.length > 0){
            return res.status(200).send({ product })
        }else{
            return res.status(404).send({ message: "Nothing was found" })
        }
    })
}

const getAllProducts = (req, res) => {
    Products.find((err, products) => {
      if(err){ return res.status(404).send(err) }

      return res.status(200).send({products})
    })
}

const updateProduct = (req, res) => {
    var productId = req.params.productId
    var productUpdated = req.body

    Products.findOneAndUpdate({_id: productId}, productUpdated, (err, product) => {
        if(err) { return res.send( err ) }
        return res.status(200).send({ message: "Product updated successfully", success: true})
    })
}

const deleteProduct = (req, res) => {
    var productId = req.params.productId

    Products.findOneAndRemove({ _id: productId}, (err, product) => {
        if(err) { return res.send(err) }

        let ids = [];
        for(var i = 0; i < product.gallery.length; i++){
          ids.push(product.gallery[i].public_id)
        }

        cloudinary.v2.api.delete_resources(ids, function(error, result){
            if(error){ return res.send(error)}

            return res.status(200).send({ message: "Product removed", success: true })
          });


    })
}

module.exports = {
    createProduct,
    getProducts,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
