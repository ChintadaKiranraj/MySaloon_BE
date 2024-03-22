const {Router} = require('express');
const UserBookingController = require('../contoller/UserBookingController');

const router = Router();
router.post('/save-user-booking', UserBookingController.save);
router.get('/fetch-All-booking-users', UserBookingController.findAll);
// router.get('/fetch-bookinguser-by-barberId',UserBookingController);
// router.get('/fetch-bookinguser-by-shopId', UserBookingController);
// router.put('/update-bookinguser', UserBookingController);
//router.get('/fetch-bookinguser-by-id', UserBookingController);

module.exports = {router};