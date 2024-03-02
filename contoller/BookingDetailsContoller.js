// const BookingEntity = require('../entity/BookingDetailsEntity');
const BookingImpl = require('../ServerImpl/BookingDetailsImpl')
const ExceptionHandling = require('../DataSecurity/ExceptionHandling')


const saveBookingDetails = function(req,res){
    try{
    let response = BookingImpl.saveBookingDetails(req);
    response.then((result)=>{
        console.log(result);
        res.send(ExceptionHandling.success(result._previousDataValues));
    }).catch((err)=>{
        console.log(err);
        if(err.message != undefined){
            res.send(ExceptionHandling.failuer(err.message))
        }else{
        res.send(ExceptionHandling.failuer(err.parent.detail));}
    })
    }catch(err){
        console.log("Success"+err);
        res.send(ExceptionHandling.failuer(err.message));
    }
}

function filterArray(data){
    let array = [];
    data.forEach((e)=>{
        array.push(e._previousDataValues);
    })
    console.log(array);
    return array;
}

const fetchBookingDetails = function (req, res) {
    try {
        let response = BookingImpl.fetchBookingDetails();
        response.then((result) => {
            console.log(result);
            res.send(ExceptionHandling.success(ExceptionHandling.filterArray(result)));
        }).catch((err) => {
            console.log(err);
            if (err.parent != undefined) {
                res.send(ExceptionHandling.failuer(err.message))
            }
            res.send(ExceptionHandling.failuer(err.parent.detail))
        })

    } catch (err) {
        console.log(err);
        res.send(ExceptionHandling.failuer(err.message));
    }
};

const removeBookingDetails = function (req, res) {
    try {
        let response = BookingImpl.removeBookingDetails(req);
        response.then((result) => {
            console.log(result);
            res.send(ExceptionHandling.success(result));
        }).catch((err) => {
            console.log(err);
            if (err.parent != undefined) {
                res.send(ExceptionHandling.failuer(err.message));
            }
            res.send(ExceptionHandling.failuer(err.parent.detail))
        })

    } catch (err) {
        console.log(err);
    }
}

const fetchBookingDetailsById = function(req,res){
    try{
    let response = BookingImpl.fetchBookingDetailsById(req);
    response.then((result)=>{
        console.log(result._previousDataValues);
        res.send(ExceptionHandling.success(result._previousDataValues));
    }).catch((err)=>{
        console.log(err);
        res.send(ExceptionHandling.failuer(err.parent.detail));
    })}catch(err){
        console.log(err);
        res.send(ExceptionHandling.failuer(err.message));
    }

}

const updateBookingDetails = function(req,res){
    try{
        let response = BookingImpl.updateBookingDetails(req);
        response.then((result)=>{
            if(!result){
            console.log("Record is not found in Database."+result);
            res.send(ExceptionHandling.failuer("Record is not found in Database."));
            }else{
            console.log(result._previousDataValues);
            res.send(ExceptionHandling.success(result._previousDataValues))
            }
        }).catch((err)=>{
            console.log(err);
            res.send(ExceptionHandling.failuer(err.parent.detail));
        })
    }catch(err){
        console.log(err);
        res.send(ExceptionHandling.failuer(err.message));

    }
}

const fetchBookingDetailsByEmailId = function(req,res){
    try{
        let response = BookingImpl.fetchBookingDetailsByEmailId(req);
        response.then((result)=>{
            console.log(result);
            if(!result){
                res.send(ExceptionHandling.failuer("something went to rong"))
            }{
                res.send(ExceptionHandling.success(ExceptionHandling.filterArray(result)));
            }
        }).catch((err)=>{
            console.log(err);
            if(err.message != undefined){
                res.send(ExceptionHandling.failuer(err.message));
            }else{
                res.send(ExceptionHandling.failuer(err.parent.detail));
            }
        })

    }catch(err){
        console.log(err);
        res.send(err.message);
    }

}

module.exports= {
    saveBookingDetails,fetchBookingDetails,removeBookingDetails,fetchBookingDetailsById,updateBookingDetails,fetchBookingDetailsByEmailId
}