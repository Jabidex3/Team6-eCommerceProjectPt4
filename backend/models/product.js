const db = require('../util/database');

module.exports = class Product {
    constructor(pid, product_name, description, price, picture) {
        this.pid = pid;
        this.product_name = product_name;
        this.description = description;
        this.price = price;
        this.picture = picture;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM product');
    }
};