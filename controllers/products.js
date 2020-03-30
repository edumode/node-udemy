const Products = require("./../models/products")


const createProduct = (req, res) => {
    
    var productToCreate = req.body

    Products.find({productCode: productToCreate.productCode}, (err, product) => {
        if(err){ return res.send( { err } ) }

        if(product.length > 0){
            return res.status(403).send({ message: "Product already exists" })
        }else{
            var product = new Products(productToCreate)

            product.save(function(err, product){
                if(err) { return res.send({ message: "There was an error", err }) }
        
                res.status(200).send({ message: "Product created successfully", product})
            })
        }
    })
}

const getProducts = (req, res) => {

    var groupToFind = req.params.groupToFind
    var itemToFind = req.params.itemToFind

    Products.find({[groupToFind]: itemToFind}, (err, product) => {
        if(err){ return res.status(404).send(err) }

        if(product.length > 0){
            return res.status(200).send({ product })
        }else{
            return res.status(404).send({ message: "Nothing was found" })
        }
    })
}

const updateProduct = (req, res) => {
    var productId = req.params.productId
    var productUpdated = req.body

    Products.findOneAndUpdate({_id: productId}, productUpdated, (err, product) => {
        if(err) { return res.send( err ) }
        return res.status(200).send({ message: "Product updated successfully"})
    })
}

const deleteProduct = (req, res) => {
    var productId = req.params.productId

    Products.findOneAndRemove({ _id: productId}, (err, product) => {
        if(err) { return res.send(err) }

        return res.status(200).send({ message: "Product removed" })
    })
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}