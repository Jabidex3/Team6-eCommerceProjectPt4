const db = require('../util/database');
const FileSave = require('../util/filesave');

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

    static find(product) {
        return db.execute('select * from product where pid = ?', [product.pid]);
    }

    static post(product)
    {
        try {
            var path = FileSave.saveProductPicture(product.picture,product.product_name);
            return db.execute('insert into product(product_name,description,price,picture) values(?,?,?,?)', [product.product_name,product.description,product.price, path]);
        } catch (error) {
           
        }
    }

    static updateWithoutPicture(product)
    {
        return db.execute('update product set product_name = ? , description = ?, price = ? where pid = ?',[product.product_name,product.description,product.price,product.pid]);
    }

    static updateWithPicture(product)
    {
       
        try{
            var path = FileSave.saveProductPicture(product.picture,product.product_name);

            return db.execute('update product set product_name = ? , description = ?, price = ?, picture = ? where pid = ?',[product.product_name,product.description,product.price, path, product.pid]);
        } catch (error) {
            
        }
    }

    static delete(id){
        return db.execute('delete from product where pid = ?', [id]);
    }
};