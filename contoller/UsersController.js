const { response } = require('express');
const userEntity = require('../models/Users');
const jwtToken = require('../Authorization');
const encodeDecode = require('../utils/EncodeDecode');
const imageDecode = require('../utils/EncodeDecode')
const registraction = function (req, res) {
    try {
        let body = req.body;
        body.password = encodeDecode.encode(body.password)
        body.confirmPassword = encodeDecode.encode(body.confirmPassword);
        let response = userEntity.Users.create(body).then((result) => {
            console.log(result);
            res.send(sucess(result));
        }).catch((error) => {
            console.error(error);
            if (error.original.detail == undefined) {
                res.status(400).send(error.message);
            } else {
                res.status(400).send(faild(error.original.detail));
            }
        });
    } catch (error) {
        console.log(error);
        console.log(response);
        res.status(400).send(error.message);
    }
};

const sucess = function (res) {
    let successResponse = {};
    successResponse.status = true,
    successResponse.code = 200,
    successResponse.message = 'Success....!'
    successResponse.data = res;
    return successResponse;
};

const faild = function (message) {
    let faildResponse = {};
    faildResponse.status = false,
    faildResponse.code = 400,
    faildResponse.message = message
    faildResponse.data = '';
    return faildResponse;
};

const loginUserValidator = function(req, res){
    try{
    let emailID = req.body.emailId;
    let password = encodeDecode.encode(req.body.password);
    userEntity.Users.findOne({
        where : {emailId : emailID, password : password },returning : true}).then((result)=>{
            console.log(result);
            if(!result){
                res.status(400).send(faild('User not found .....! please check login user name and password!.'))
            }else{
                let response2 = sucess(result);
                response2.token = jwtToken.generateToken(result);
                res.send(response2);}
        }).catch((error)=>{
            if(error.original == undefined){
                res.status(400).send(faild(error.message))
            }
            res.status(400).send(faild(error.original.detail));
        });}catch(error){
            console.log(error);
            res.status(400).send(faild(error.message));
        }
};

const updateRegUsers = async function(req,res){
    try{
    let emailId = req.body.emailId;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if(password != undefined){
        req.body.password = encodeDecode.encode(password);
    }if(confirmPassword != undefined){
        req.body.confirmPassword = encodeDecode.encode(confirmPassword);
    }
    let findUser = await userEntity.Users.findOne({
        where:{emailId : emailId }});
        if(!findUser){
            res.status(400).send(faild("User not found...! please check login user"));
        }else{
            await findUser.update(req.body).then((result)=>{
                console.log(result);
                res.send(sucess(result));
            }).catch((error)=>{
                console.error('user update exception is :',error);
                if(error.original == undefined){
                    res.status(400).send(faild(error.message));
                }else{
                res.status(400).send(faild(error.original.detail));
                }});
        }}catch(error){
            res.status(400).send(faild(error.message));
        }
};

const deleteRegUser = function (req,res){
    try{
        userEntity.Users.destroy({
            where : {emailId : req.params.emaild},returning: true
        }).then((result)=>{
            console.log(result);
            if(!result){
            res.status(400).send(faild("User not found...! please check once"));}
            else{res.send(sucess(result));}
        }).catch((error)=>{
            console.log(error);
            if(error.original == undefined){
            res.status(400).send(faild(error.message));
            }else{res.status(400).send(faild(error.original.detail));}
        })
    }catch(error){
        console(error);
        res.status(400).send(error.message);
    }

};

const imageConvert = function(result){
    return  result.forEach(e=>{
        if(e.profilePhoto != null){
            e.profilePhoto = imageDecode.base64Decode(e.profilePhoto)
        }
    });
}


const fetchUsersByUserType = function(req,res){
    try{
    let userType = req.params.userType;
    userEntity.Users.findAll({where:{userType:userType}}).then((result)=>{
        console.log(result);
        if(result!=null){
        imageConvert(result);
        }
        res.send(sucess(result));
    }).catch((error)=>{
        console.log(error);
        if(error.original==undefined){res.status(400).send(faild(error.message));
        }else{res.status(400).send(faild(error.original.detail)); }
    })}catch(error){
        console.log(error);
        res.status(400).send(faild(error.message))
    }
};

const fetchByPrimaryKey = function(req,res){
    userEntity.Users.findByPk(req.params.userId).then((result)=>{
        console.log(result);
        if(result!=null){
        result.dataValues.profilePhoto = imageDecode.base64Decode(result.dataValues.profilePhoto);
        }
        res.send(sucess(result));
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(error.message);
    });

}
module.exports = { registraction,loginUserValidator,updateRegUsers,deleteRegUser,fetchUsersByUserType,fetchByPrimaryKey }