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