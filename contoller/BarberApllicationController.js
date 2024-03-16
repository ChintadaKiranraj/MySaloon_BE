const {BarberApplication} = require('../models/BarberApplicationsEntity')
const imageConvert = require('../utils/EncodeDecode')

const success = function(data){
    let successResponse = {};
    successResponse.status = true,
    successResponse.code = 200,
    successResponse.message = 'Success....!'
    successResponse.data = data;
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

const save = function(req,res){
    BarberApplication.create(req.body).then((result)=>{
        console.log(result); 
        result.dataValues.profilePhoto = imageConvert.base64Decode(result.dataValues.profilePhoto)
        res.send(success(result));
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error.message);
    });

};

const listOfImageConvetion = function(data){
    return data.forEach(e=>{
        e.profilePhoto = imageConvert.base64Decode(e.profilePhoto);
    }); 
};

const fetchAll = function(req,res){
    BarberApplication.findAll().then((result)=>{
        console.log(result);
        if(result!=null){
        listOfImageConvetion(result);
        }
        res.send(result)
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(faild(error.message));
    })
}

module.exports = {save,fetchAll}