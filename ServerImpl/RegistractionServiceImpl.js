const { Model } = require("sequelize");
const regEntity = require('../entity/RegistractionEntity');
const exseption = require('../DataSecurity/ExceptionHandling');

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
    let emailID = request.body.emailId;
    let password1 = request.body.password;
    return regEntity.Registration.findOne({
        where : {
            emailId:emailID,
            password: password1
        }
    })

}

async function approvedAdminAccess(request){
    let EmailID = request.body.emailId;
    let fetch = await regEntity.Registration.findByPk(EmailID);
    if(!fetch){
        return null;
    }
    return await fetch.update(request.body);
}

async function removeRegistedUser(request){
    let emailID = request.body.emailId;
    return await regEntity.Registration.destroy({
        where:{emailId:emailID},returning: true
    });
}

module.exports = {
    registractionLogin,fetchRegistrationDetails,fetchRegistrationDetailsById,loginValidation,approvedAdminAccess,removeRegistedUser
}