const { Model } = require("sequelize");
const regEntity = require('../entity/RegistractionEntity');
const exseption = require('../DataSecurity/ExceptionHandling')

function registractionLogin(request){
    let data = request.body;
    return regEntity.Registration.create(data);
}

function fetchRegistrationDetails(){
    return regEntity.Registration.findAll();

}

module.exports = {
    registractionLogin,fetchRegistrationDetails
}