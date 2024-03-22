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
router.get('/fetch-by-location/:shopeLocation', jwtToken.authenticate,ShopOwnersController.fetchByBasedOnLocation2); //done

module.exports = {router}