var fs = require('fs');
const db = require('../util/database');
module.exports = class FileSave{
    
    static saveUserPicture(userId,data){
        // creates name for picture based off of user id, then shaves off leading data. saves picture using fs then updates the database path
        //console.log("Data from picture = " + data);
        var pictureName = "user_"+userId+".jpg"
        var path = "../backend/assets/users/"+pictureName;
        const dataPic = data.replace(/^data:.*,/,'');
       // console.log(dataPic);
        fs.writeFile(path,dataPic,'base64', function(err,result){
            if(err)
            {
                console.log(err);
            }
            else
            {
            }
        });
        db.execute('update user set picture = ? where id = ?', [pictureName, user.id]);
    }
    static saveProductPicture(data,name){
        // creates name for picture based off of user id, then shaves off leading data. saves picture using fs then updates the database path
        //console.log("Data from picture = " + data);
        var pictureName = "product_"+ name +".jpg"
        var path = "../backend/assets/products/"+pictureName;
        const dataPic = data.replace(/^data:.*,/,'');
       // console.log(dataPic);
        fs.writeFile(path,dataPic,'base64', function(err,result){
            if(err)
            {
                console.log(err);
            }
            else
            {
            }
        });
        return pictureName;
    }


    
};
