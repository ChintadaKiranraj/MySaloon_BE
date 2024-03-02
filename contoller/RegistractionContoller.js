const registractionImpl = require('../ServerImpl/RegistractionServiceImpl')
const ExceptionHandling = require('../DataSecurity/ExceptionHandling')
// const router = require('../routes/RegistractionRoutes');


const loginRegistration = function (req, res) {
    try{
    let response = registractionImpl.registractionLogin(req);
    response.then((result) => {
        console.log(result._previousDataValues);
        res.send(ExceptionHandling.success(result._previousDataValues));
    }).catch((err) => {
        console, console.log(err.parent.detail);
        console, console.log(err);
        res.send(ExceptionHandling.failuer(err.parent.detail));
    });}catch(err){
        console.log(err);
        console.log(err.message);
    }
}

const fetchRegistrationDetails = function(req, res){
    try{
        req.headers;
        let response = registractionImpl.fetchRegistrationDetails();
        response.then((result)=>{
            console.log(result);
            res.send(ExceptionHandling.success(result));
        }).catch((err)=>{
            console.log(err);
            res.send(ExceptionHandling.failuer("fails"));
        })

    }catch(err){
        console.log(err.message);
        console.log(err);
        res.status(400).send(ExceptionHandling.failuer("fails"))
    }

}

module.exports = {
    loginRegistration,fetchRegistrationDetails,
}