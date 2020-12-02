const User = require('../models/user');
const { all } = require('../routes/user');
const FileSave = require('../util/filesave');
var fs = require('fs');
var fsp = require('fs').promises;

exports.getAllUsers = async (req, res, next) =>{
    try{
        const [allUsers] = await User.fetchAll();
        for (var user of allUsers) {
            user.picture =  "data:image/jpeg;base64," + await fsp.readFile("../backend/assets/users/"+user.picture, 'base64');
        }
        res.status(200).json(allUsers);

    } catch{
        console.log('Error');
    }
};

exports.registerUser = async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const picture = "defaultProfilePic.jpg";
  
    try{
        const userDetails = {
            email:email,
            password:password,
            role:role,
            picture:picture
        };
    
        const postUser = await User.post(userDetails);
        res.status(201).json({message:'user created'});
    } catch{
        console.log('Error');
    }
};

exports.loginUser = async (req, res, next) =>{
    const email = req.params.email;
    const password = req.params.password;
   // const role = req.body.role;
    try{
        const userDetails = {
            email:email,
            password:password,
         //   role:role,
        };
        const login = await User.find(userDetails);
        const [loginTwo] = await User.find(userDetails);
        if(login[0].length>0){ //check if there was any matches
            //retrieve profile picture and replace picture with base64 representation.
            const path = "../backend/assets/users/"+loginTwo[0].picture;
            fs.readFile(path, 'base64', function (err, result) {
                if(err)
                    console.log(err);
                loginTwo[0].picture = "data:image/jpeg;base64,"+ result;
                res.status(202).json(loginTwo);
            });
        }
        else{
            res.status(404).json(loginTwo);
        }
        
    } catch{
        console.log('Error');
    }
};

exports.getUser = async (req, res, next) =>{ //logged in already
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try{
        const userDetails = {
            email:email,
            password:password,
            role:role,
        };
        const [userFound] = await User.find(userDetails);
        res.status(200).json(userFound);
        
    } catch{
        console.log('Error');
    }
};

exports.putUser = async (req, res, next) =>{
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    try{
        const userDetails = {
            id:id,
            email:email,
            password:password,
            role:role,
        };
        const putResponse = await User.update(userDetails);
        res.status(200).json(putResponse);
    } catch{
        console.log('Error');
    }
};

exports.deleteUser = async (req, res, next) =>{
    try{
        const deleteResponse = await User.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch{
        console.log('Error');
    }
};

exports.putPicture = async (req, res, next) => {
    const id = req.body.id;
    const picture = req.body.picture;
    try {
        console.log(id);
        //console.log(picture);
        FileSave.savePicture(id,picture);
        res.send("OK").status(200);
    } catch (error) {
        console.log('ERROR:  ' + error);
        res.send("error").status(400);
    }
}