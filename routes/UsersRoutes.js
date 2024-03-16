const {Router} = require('express');
const authenticate = require('../Authorization');
const UserController = require('../contoller/UsersController');
const enumss = require('../enum/UsersType')
const router = Router();
router.post('/registraction',UserController.registraction);
router.post('/loginValidator',UserController.loginUserValidator);
router.get('/fetch-users-type',enumss.userTypes);
router.post('/updateRegUsers', authenticate.authenticate,UserController.updateRegUsers);
router.delete('/deleteRegUser/:emaild', authenticate.authenticate,UserController.deleteRegUser);
router.get('/fetch-users-by-usertype/:userType', UserController.fetchUsersByUserType);
router.get('/fetch-user-by-primarykey/:userId', authenticate.authenticate,UserController.fetchByPrimaryKey);

module.exports = {router}