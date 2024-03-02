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

function updateBookingDetails(request){
    let data = request.body;
    return BookingDetailsEntity.update(data, {
        where: {
            id: 48
        },
        returning: true // Optional: If you want to return the updated record
    });
}

module.exports = {
    saveBookingDetails,fetchBookingDetails,removeBookingDetails,fetchBookingDetailsById,updateBookingDetails
}