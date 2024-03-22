const {BookingDetailsEntity} = require('../models/UserBookingEntity');

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
    .catch((error)=>{})
    console.log(error)
    res.status(400).send(Faild(error.message));
};

const fetchByBarberId = function(req,res){

};

const fetchByShopId = function(req,res){

};

const updateById =function(req,res){

}

module.exports= {findAll,save}