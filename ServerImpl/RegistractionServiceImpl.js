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

function fetchRegistrationDetailsById(email_id){
    return regEntity.Registration.findByPk(email_id);
}

function loginValidation(request){
    let emailID = request.body.email_id;
    let password1 = request.body.password;
    return regEntity.Registration.findOne({
        where : {
            email_id:emailID,
            password: password1
        }
    })

}

module.exports = {
    registractionLogin,fetchRegistrationDetails,fetchRegistrationDetailsById,loginValidation
}