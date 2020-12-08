const db = require('../util/database');
const FileSave = require('../util/filesave');

module.exports = class Cart {
    constructor(cid, id, product_name, price, picture) {
        this.cid = cid;
        this.id = id;
        this.pid = pid;
        this.product_name = product_name;
        this.price = price;
        this.picture = picture;
    }


    static fetchAll(cartItems) {
        return db.execute('select * from cart where id = ?', [cartItems.id]);
    }

    static post(item) {
        // console.log(email);
        // console.log(password);
        return db.execute('Insert into cart (id, pid, product_name, picture, price) Values (?,?,?,?,?)', [item.id, item.pid, item.product_name, item.picture, item.price]);
    }

    static delete(cid) {
        return db.execute('delete from cart where cid = ?', [cid]);
    }

    static deleteAll(id) {
        return db.execute('delete from cart where id = ?', [id]);
    }

    static numItemInCart(cartItems) {
        return db.execute('SELECT COUNT(*) as records FROM cart where id=?', [cartItems.id]);
    }

    static cartTotalPrice(idOfLoggedInUser) {
        return db.execute('select sum(price) as total from cart where id = ?', [idOfLoggedInUser.id]);
    }
};