const { ShopOwners } = require('../models/ShopOwnersEntity');
const {BookingDetailsEntity} = require('../models/UserBookingEntity');
const { Users } = require('../models/Users');
const { base64Decode } = require('../utils/EncodeDecode');

const findAll = function(req,res){
    console.log('test');
    BookingDetailsEntity.findAll().then((result)=>{
        console.log(result);
        res.send(Success(result));
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(Faild(error.message));
    });
};

const Success = function(result){
    let response = {};
    response.status = true;
    response.code = 200;
    response.message = 'Successfully ...!';
    response.data = result;
    return response;
};

const Faild = function(errormMessage){
    let response = {};
    response.status = false;
    response.code = 400;
    response.message = errormMessage;
    response.data = null;
    return response;
};

const save = function(req,res){
    let body = req.body;
    BookingDetailsEntity.create(body)
    .then((result)=>{
        console.log(result);
        res.send(Success(result));
    })
    .catch((error)=>{
    console.error(error)
    res.status(400).send(Faild(error.message));})
};

const fetchByBarberId = function(req,res){
    let barberId = req.params.barberId;
    BookingDetailsEntity.findAll({
        include:[{model:Users, attributes:['firstName','lastName','emailId','profilePhoto']}],
        where:{barberId : barberId}
    }).then((result)=>{
        console.log(result);
        let response = convertBokkingEntityObject(result);
        res.send(Success(response))

    }).catch((error)=>{
        console.error(error);
        res.status(400).send(Faild(error.message));
    })

};

const convertBokkingEntityObject = function(listOfJson){
    let arrays = [];
    listOfJson.forEach(object => {
        let responseOfUserBookingEntity = {};
        let data = object.dataValues;
        responseOfUserBookingEntity.bookingId = data.bookingId;
        responseOfUserBookingEntity.userId = data.userId;
        responseOfUserBookingEntity.location = data.location;
        responseOfUserBookingEntity.shopName = data.shopName;
        responseOfUserBookingEntity.barberId = data.barberId;
        responseOfUserBookingEntity.shopOwnerId = data.shopOwnerId;
        responseOfUserBookingEntity.booking_date_time = data.booking_date_time;
        responseOfUserBookingEntity.status = data.status;
        responseOfUserBookingEntity.firstName = data.user.firstName;
        responseOfUserBookingEntity.lastName = data.user.lastName;
        responseOfUserBookingEntity.emailId = data.user.emailId;
        responseOfUserBookingEntity.profilePhoto = (data.user.profilePhoto  == null)? null :base64Decode(data.user.profilePhoto);
        arrays.push(responseOfUserBookingEntity);
        
    });
    return arrays;
}

const fetchByShopId = function(req,res){
    let shopId = req.params.shopId;
    BookingDetailsEntity.findAll({
        include:[{model:Users,  attributes:['firstName','lastName','emailId','profilePhoto']}],
        where:{shopOwnerId:shopId}
    }).then((result)=>{
        console.log(result);
        let responseJson = convertBokkingEntityObject(result);
        res.send(Success(responseJson))
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(error.message);
    })


};

const updateById =async function(req,res){
    let requestJson = req.body;
    let id = requestJson.bookingId;
   let existingData = await BookingDetailsEntity.findByPk(id);
   if(existingData == null){
    res.send(Faild('your not found.'));
   }else{
    let updated = existingData.update(requestJson);
    console.log('user updated successfully !', updated);
    res.send(Success(requestJson));
   }

};

const fetchById = function(req,res){
    let id = req.params.id;
    BookingDetailsEntity.findByPk(id).then((result)=>{
        console.log(result);
        res.send(Success(result));
    }).catch((error)=>{
        console.error(error);
        res.status(400).send(Faild(error.message));
    })
}

module.exports= {findAll,save,fetchById,updateById,fetchByBarberId,fetchByShopId}