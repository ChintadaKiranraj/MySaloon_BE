const registractionImpl = require('../ServerImpl/RegistractionServiceImpl')
const ExceptionHandling = require('../DataSecurity/ExceptionHandling')
const encodedecoding = require('../DataSecurity/EncodeDecode')
const authenticate = require('../Authorization')

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
        let response = registractionImpl.fetchRegistrationDetails();
        response.then((result)=>{
            console.log(result);
            res.send(ExceptionHandling.success(ExceptionHandling.filterArray(result)));
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

const loginValidation = function(req,res){
    let response2 = {};
    try{
        let response = registractionImpl.loginValidation(req);
        response.then((result)=>{
            if(!result){
                res.send(ExceptionHandling.failuer("user not found"));

            }else{
            let responseData = result._previousDataValues;
            let token = authenticate.generateToken(responseData)
            response2.status = true
            let response  = ExceptionHandling.success('s');
            response.data = token;
            res.send(response);
        }})

    }catch(err){
        console.log(err)
        res.send(ExceptionHandling.failuer(err.message));
    }
}

// const authentication = function(headerRequest,res){
//     let authenticationResponse = {};
//     try{
//         let data = headerRequest.headers.authorization
//        let dd = data.substring(0, data.indexOf(' '));
//        let dd2 = data.split(' ');
//        if(dd2[0] == 'Bearer'){
//         let decodeData = encodedecoding.decode(dd2[1])
//         let emailId = 'maniakt@gmail.com';
//         let response = registractionImpl.fetchRegistrationDetailsById(emailId);
//         response.then((result)=>{
//             if(result !=null){
//                 authenticationResponse.status = true
//                 authenticationResponse.message = ""
//                 return authenticationResponse;

//             }else{
//                 authenticationResponse.status = false
//                 authenticationResponse.message = "unable to login please check your token"
//                 return authenticationResponse;

//             }
//             console.log(result._previousDataValues);
//         }).catch((err)=>{
//             authenticationResponse.status = false
//             authenticationResponse.message = "unable to login please check your token"
//             return authenticationResponse;

//         })
//        }

//     }catch(err){
//         console.log(err);

//     }
// }


module.exports = {
    loginRegistration,fetchRegistrationDetails,loginValidation
}