const {Router} = require('express')
const BarberController = require('../contoller/BarberApllicationController')

const router = Router();
router.post('/save-barber-application',BarberController.save);
router.get('/fetch-all-barber-application',BarberController.fetchAll);

module.exports={router}