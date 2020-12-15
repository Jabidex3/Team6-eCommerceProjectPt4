const Product = require('../models/product');
const { all } = require('../routes/user');
var fs = require('fs');
var fsp = require('fs').promises;

exports.getAllProducts = async (req, res, next) => {
    try {
        const [allProducts] = await Product.fetchAll();
        for (var product of allProducts) {
            product.picture = "data:image/jpeg;base64," + await fsp.readFile("../backend/assets/products/" + product.picture, 'base64');
        }
        res.status(200).json(allProducts);
    } catch {
        console.log('Error');
    }
};

exports.getProduct = async (req, res, next) => {
    const pid = req.params.pid;
    try {
        const productDetails = {
            pid: pid
        };
        const [prod] = await Product.find(productDetails);
        for (var product of prod) {
            product.picture = "data:image/jpeg;base64," + await fsp.readFile("../backend/assets/products/" + product.picture, 'base64');
        }
        if (prod.length > 0) { //check if there was any matches
            res.status(202).json(prod[0]);
            console.log('success');
        }
        else {
            res.status(404).json(prod[0]);
        }

    } catch {
        console.log('Error');
    }

};

exports.getProductForCart = async (req, res, next) => {
    const pid = req.params.pid;
    try {
        const productDetails = {
            pid: pid
        };
        const [prod] = await Product.find(productDetails);
        if (prod.length > 0) { //check if there was any matches
            res.status(202).json(prod[0]);
            console.log('success');
        }
        else {
            res.status(404).json(prod[0]);
        }

    } catch {
        console.log('Error');
    }

};

exports.addProduct = async (req, res, next) => {

    const productDetails = {
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        picture: req.body.picture
    }

    //console.log(productDetails.picture);
    // check if picture was recieved, if not dont create product
    if (req.body.picture == null || req.body.picture == undefined || req.body.picture == "") {
        //console.log("value of picture = " + productDetails.picture);
        res.sendStatus(400);
    }
    else {
        var response = await Product.post(productDetails);
        res.sendStatus(200);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        console.log(req.params.pid);
        const deleteResponse = await Product.delete(req.params.pid);
        res.status(200).json(deleteResponse);
    } catch {
        console.log('Error');
    }
};

exports.putProduct = async (req, res, next) => {

    const productDetails = {
        pid: req.body.pid,
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price,
        picture: req.body.picture
    }

    //console.log(productDetails.picture);
    // check if picture was recieved, if not dont create product
    if (req.body.picture == null || req.body.picture == undefined || req.body.picture == "") {
        var response = await Product.updateWithoutPicture(productDetails);
        res.sendStatus(200);
    }
    else {
        var response = await Product.updateWithPicture(productDetails);
        res.sendStatus(200);
    }
}