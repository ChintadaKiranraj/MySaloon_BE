const {Router} = require('express');
const UserBookingController = require('../contoller/UserBookingController');

const router = Router();
router.post('/save-user-booking', UserBookingController.save);
router.get('/fetch-All-booking-users', UserBookingController.findAll);
router.get('/fetch-bookinguser-by-barberId/:barberId',UserBookingController.fetchByBarberId);
router.get('/fetch-bookinguser-by-shopId/:shopId', UserBookingController.fetchByShopId);
router.put('/update-bookinguser', UserBookingController.updateById);
router.get('/fetch-bookinguser-by-id/:id', UserBookingController.fetchById);

module.exports = {router};