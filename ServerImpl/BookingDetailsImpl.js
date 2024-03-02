const bookingEntity = require('../entity/BookingDetailsEntity')
const ExceptionHandling = require('../DataSecurity/ExceptionHandling')
function saveBookingDetails(request){
    let data = request.body;
    return bookingEntity.BookingDetailsEntity.create(data);
}

function fetchBookingDetails(){
    return bookingEntity.BookingDetailsEntity.findAll();
}

function removeBookingDetails(request) {
    let ids = request.body.id;
    return bookingEntity.BookingDetailsEntity.destroy({
        where: {id: ids},returning: true
    })
    
}

function fetchBookingDetailsById(requst){
    let ids = requst.body.id;
    return bookingEntity.BookingDetailsEntity.findByPk(ids);

}

async function updateBookingDetails(request){
    let id = request.body.id;
    const recordToUpdate = await bookingEntity.BookingDetailsEntity.findByPk(id);
    if(!recordToUpdate){
        return null;
    }
    return await recordToUpdate.update(request.body);
}

async function fetchBookingDetailsByEmailId(request){
    let emailID = request.body.emailId;
    return await bookingEntity.BookingDetailsEntity.findAll({
        where:{
            regEmialId:emailID
        },returning: true
    })

}

module.exports = {
    saveBookingDetails,fetchBookingDetails,removeBookingDetails,fetchBookingDetailsById,updateBookingDetails,fetchBookingDetailsByEmailId
}