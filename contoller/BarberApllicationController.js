const {BarberApplication} = require('../models/BarberApplicationsEntity');
const { ShopOwners } = require('../models/ShopOwnersEntity');
const { Users } = require('../models/Users');
const imageConvert = require('../utils/EncodeDecode')
const BarberApplicationDTO = require('../utils/BarberApplicationDTO')



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

// const listOfImageConvetionThreeTablesData = function(data){
//     return data.forEach(e=>{
//         if(e.dataValues.profilePhoto != null){
//         e.dataValues.profilePhoto = imageConvert.base64Decode(e.dataValues.profilePhoto);
//         }
//     }); 
// };

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
};


const convertToBarberApplicationDTOs = function(result) {
    let arrayOfObject = [];
    result.forEach(e => {
        let barberApplicationDTO = {};
        barberApplicationDTO.shopOwnerId = e.dataValues.shopOwnerId;
        let data = e.dataValues;
        barberApplicationDTO.barberId = data.barberId;
        barberApplicationDTO.userId = data.userId;
        barberApplicationDTO.shopName = data.shopName;
        barberApplicationDTO.location = data.location;
        barberApplicationDTO.experience = data.experience;
        if (data.profilePhoto != null) {
            barberApplicationDTO.profilePhoto = imageConvert.base64Decode(data.profilePhoto);
        } else {
            barberApplicationDTO.profilePhoto = null;
        }
        barberApplicationDTO.firstName = data.user.firstName;
        barberApplicationDTO.lastName = data.user.lastName;
        barberApplicationDTO.emailId = data.user.emailId;
        arrayOfObject.push(barberApplicationDTO);
    });
    return arrayOfObject;
}

const fetchByShapoIdLocationStatus = function(req,res){
    BarberApplication.findAll({ where: { 
        shopOwnerId: req.body.shopOwnerId, location: req.body.location, status: req.body.status
    },attributes:['barberId','shopOwnerId','userId','shopName','location','experience','profilePhoto']
 
    ,include: [
            { model: Users ,attributes:['firstName','lastName','emailId']},
        ]}).then((result) => {
        console.log(result);
        let arrayOfObject = null;
        if(result != null){
        arrayOfObject = convertToBarberApplicationDTOs(result);
        }
        console.log(arrayOfObject);
        res.send(success(arrayOfObject));
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(error.message);
    });
};



const convertToBarberApplicationDTOs2 = function(result) {
    let arrayOfObject = [];
    result.forEach(e => {
        let barberApplicationDTO = {};
        barberApplicationDTO.shopOwnerId = e.dataValues.shopOwnerId;
        let data = e.dataValues;
        barberApplicationDTO.barberId = data.barberId;
        barberApplicationDTO.userId = data.userId;
        barberApplicationDTO.shopName = data.shopName;
        barberApplicationDTO.location = data.location;
        barberApplicationDTO.experience = data.experience;
        barberApplicationDTO.status = data.status;
        if (data.profilePhoto != null) {
            barberApplicationDTO.profilePhoto = imageConvert.base64Decode(data.profilePhoto);
        } else {
            barberApplicationDTO.profilePhoto = null;
        }
        barberApplicationDTO.firstName = data.user.firstName;
        barberApplicationDTO.lastName = data.user.lastName;
        barberApplicationDTO.emailId = data.user.emailId;
        arrayOfObject.push(barberApplicationDTO);
    });
    return arrayOfObject;
}

const fetchByShoipeIdAndStatus = function(req,res){
    let body = req.params;
    let shoipeId = body.shoipeId;
    let status = body.status;
    BarberApplication.findAll({
        include:[{model:Users,attributes:['firstName','lastName','emailId','userId']}],
        where:{
            shopOwnerId:shoipeId,status:status
        }
    }).then((result)=>{
        console.log(result);
        let response = convertToBarberApplicationDTOs2(result);
        res.send(success(response))
    }).catch((error)=>{
        console.log(error);
        res.send(faild(error.message));
    })
}


const fetchByShoipeId = function(req,res){
    let body = req.params;
    let shoipeId = body.shoipeId;
    BarberApplication.findAll({
        include:[{model:Users,attributes:['firstName','lastName','emailId','userId']}],
        where:{
            shopOwnerId:shoipeId
        }, order: [
            ['status', 'DESC'],
        ]
    }).then((result)=>{
        console.log(result);
        let response = convertToBarberApplicationDTOs2(result);
        res.send(success(response))
    }).catch((error)=>{
        console.log(error);
        res.send(faild(error.message));
    })
}



const fetchThreeTableData = function(req,res){
    try{
    BarberApplication.findAll({
        include: [
            { model: Users },
            { model: ShopOwners }
        ]
    })
    .then(barberApplication => {
        if (barberApplication) {
            console.log('Found BarberApplication:', barberApplication.toJSON());
            console.log('Associated User:', barberApplication.user.toJSON());
            console.log('Associated ShopOwner:', barberApplication.shop_owner.toJSON());
            res.send(barberApplication.toJSON());
        } else {
            console.log('BarberApplication not found.');
        }
    })
    .catch(err => {
        console.error('Error fetching data:', err);
    });}catch(eero){
        console.log(eero);
        res.send(eero);
    }
}

module.exports = {save,fetchAll,fetchByShapoIdLocationStatus,fetchThreeTableData,fetchByShoipeIdAndStatus,fetchByShoipeId}