const {Router} = require('express');
const ShopOwnersController = require('../contoller/ShopOwnersController');
const jwtToken = require('../Authorization');
const router = Router();
router.post('/save-shope-owner',ShopOwnersController.saveShopeOwners);
router.get('/fetch-shope-owner-by-userid/:userId', jwtToken.authenticate,ShopOwnersController.fetchShopeOwnerByUserId);
router.post('/update-shope-owner', jwtToken.authenticate,ShopOwnersController.updateShopOwner);
router.get('/fetch-by-shopeid/:shopeOwnerId',ShopOwnersController.fetchByPrimaryKey);
router.get('/fetch-shope-location', jwtToken.authenticate,ShopOwnersController.fetchAllShopeLocation);
router.get('/fetch-all-shopeowner', jwtToken.authenticate,ShopOwnersController.fetchAll);
//above all api is nice check below api's

router.get('/fetch-by-location/:shopeLocation',ShopOwnersController.fetchByBasedOnLocation2); //done


//above api need user table firstName,lastName,emailId,phoneNumber


module.exports = {router}