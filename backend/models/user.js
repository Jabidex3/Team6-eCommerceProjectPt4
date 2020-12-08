const db = require('../util/database');
const FileSave = require('../util/filesave');

module.exports = class User{
    constructor(id,email,password,role){
        this.id=id;
        this.email=email;
        this.password=password;
        this.role=role;
    }

    static find(user){
        return db.execute('select * from user where email = ? and password = ?',[user.email,user.password]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM user');
    }
    
    static post(user) {
        // console.log(email);
        // console.log(password);
        return db.execute('Insert into user (email, password, role, picture) Values (?,?,?,?)', [user.email,user.password,user.role,user.picture]);
    }

    static updateWithoutPicture(user)
    {
        return db.execute('update user set email = ? , password = ?, role = ? where id = ?',[user.email,user.password,user.role, user.id]);
    }

    static updateWithPicture(user)
    {
       
        try{
            var path = FileSave.saveUserPicture(user.id, user.picture);

            return db.execute('update user set email = ? , password = ?, role = ?,  picture = ? where id = ?',[user.email, user.password,user.role, path, user.id]);
        } catch (error) {
            
        }
    }

    static update(user){
        return db.execute('update user set email = ?, password = ?, role = ? where id = ?', [user.email,user.password,user.role, user.id]);
    }

    static delete(id){
        return db.execute('delete from user where id = ?', [id]);
    }
    
};
