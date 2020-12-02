const Product = require('../models/product');
const { all } = require('../routes/user');

exports.getAllProducts = async (req, res, next) => {
    try {
        const [allProducts] = await Product.fetchAll();
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