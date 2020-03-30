const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const userRoute = require("./routes/users")
const productsRoute = require("./routes/products")
const purchaseRoute = require("./routes/purchases")

const uri = require("./global/uridb")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.use("/user", userRoute)
app.use("/product", productsRoute)
app.use("/purchase", purchaseRoute)


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(result => {
        app.listen(3000, () => {
            console.log("> Server running!")
            console.log("> Connected!")
        })
    })
    .catch(err => {
        console.log(err)
    })




