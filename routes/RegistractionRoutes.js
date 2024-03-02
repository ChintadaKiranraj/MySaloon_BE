const {Router} = require('express');
// const router = require('express');
// const routers = router.Router();
const login = require('../contoller/RegistractionContoller');

const router = Router();
router.post("/registraction-logn");

module.exports = {
router,
}
