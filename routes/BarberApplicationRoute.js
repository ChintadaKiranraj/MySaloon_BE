const {Router} = require('express')
const BarberController = require('../contoller/BarberApllicationController')
const Jwt = require('../Authorization');

const router = Router();
router.post('/save-barber-application',Jwt.authenticate,BarberController.save);
router.get('/fetch-all-barber-application',Jwt.authenticate,BarberController.fetchAll);
router.post('/fetch-barbers-by-shopId-location-status',BarberController.fetchByShapoIdLocationStatus);
router.get('/fetch-baebers-by-status-shoipe-id/:shoipeId/:status',BarberController.fetchByShoipeIdAndStatus);
router.get('/fetch-barbers-all-by-status/:shoipeId',BarberController.fetchByShoipeId);
router.delete('/delete-baeber-by-barberId/:barberId',BarberController.deleteById);


router.get('/test',BarberController.fetchThreeTableData);


module.exports={router}