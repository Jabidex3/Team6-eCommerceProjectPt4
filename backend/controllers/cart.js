const Product = require('../models/product');
const Cart = require('../models/cart');
const { all } = require('../routes/user');
var fs = require('fs');
var fsp = require('fs').promises;

exports.getCart = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cartDetails = {
            id: id
        };
        const [prod] = await Cart.fetchAll(cartDetails);
        for (var product of prod) {
            product.picture = "data:image/jpeg;base64," + await fsp.readFile("../backend/assets/products/" + product.picture, 'base64');
        }
        if (prod.length > 0) { //check if there was any matches
            res.status(202).json(prod);
            console.log('success');
        }
        else {
            res.status(404).json(prod);
        }

    } catch {
        console.log('Error');
    }

};

exports.addToCart = async (req, res, next) => {
    const id = req.body.id;
    const pid = req.body.pid;
    const product_name = req.body.product_name;
    const picture = req.body.picture;
    const price = req.body.price;

    try {
        const itemDetails = {
            id: id,
            pid: pid,
            product_name: product_name,
            picture: picture,
            price: price
        };

        const postUser = await Cart.post(itemDetails);
        res.status(201).json({ message: 'item added' });
    } catch {
        console.log('Error');
    }
};