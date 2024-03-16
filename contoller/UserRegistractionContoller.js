// const ExceptionHandling = require('../utils/ExceptionHandling')
// const authenticate = require('../Authorization')
// const RegModel = require('../models/RegistractionEntity');

// const loginRegistration = function (req, res) {
//     try{
//     let response =  RegModel.Registration.create(req.body);
//     return finalResponse(response,res);
//     }catch(err){
//         console.log(err);
//         console.log(err.message);
//         res.send(ExceptionHandling.failuer(err.message));
//     }
// };

// function finalResponse(response, res) {
//     response.then((result) => {
//         if (!result) {
//             console.error("result  :", result);
//             res.send(ExceptionHandling.failuer("user not found"));
//         } else if (!result._previousDataValues) {
//             console.log("result is :", result);
//             res.send(ExceptionHandling.success(result));
//         } else {
//             console.log("result in previousDataValues :", result._previousDataValues);
//             res.send(ExceptionHandling.success(result._previousDataValues));
//         }
//     }).catch((err) => {
//         if (err.parent == undefined) {
//             console.log(err.message);
//             res.send(ExceptionHandling.failuer(err.message))
//         } else if (err.parent.detail != undefined || err.parent.detail) {
//             console.log(err.parent.detail);
//             res.send(ExceptionHandling.failuer(err.parent.detail));
//         } else if (!err.message) {
//             console.log(err);
//             res.send(ExceptionHandling.failuer(err));
//         } else {
//             console.log(err.message);
//             res.send(ExceptionHandling.failuer(err.message));
//         }
//     });
// }

// const fetchRegistrationDetails = function(req, res){
//     try{
//         let response = RegModel.Registration.findAll();
//         response.then((result)=>{
//             console.log(result);
//             res.send(ExceptionHandling.success(ExceptionHandling.filterArray(result)));
//         }).catch((err)=>{
//             console.log(err);
//             res.send(ExceptionHandling.failuer("fails"));
//         })
//     }catch(err){
//         console.log(err.message);
//         console.log(err);
//         res.status(400).send(ExceptionHandling.failuer("fails"))
//     }

// }

// const loginValidation = function(req,res){
//     let response2 = {};
//     try{
//     let response =  RegModel.Registration.findOne({
//         where : {
//             emailId: req.body.emailId,
//             password: req.body.password
//         }
//     });
//         response.then((result)=>{
//             if(!result){
//                 res.send(ExceptionHandling.failuer("user not found"));

//             }else{
//             let responseData = result._previousDataValues;
//             let token = authenticate.generateToken(responseData)
//             response2.status = true
//             let response  = ExceptionHandling.success(result._previousDataValues);
//             response.token = token;
//             res.send(response);
//         }})

//     }catch(err){
//         console.log(err)
//         res.send(ExceptionHandling.failuer(err.message));
//     }
// }

// const approvedAdminAccess =async function(req,res){
//     try{
//         let response;
//         let fetch = await RegModel.Registration.findByPk(req.body.emailId);
//         if(!fetch){
//             response = null;
//         }
//         response = await fetch.update(req.body);
//      return finalResponse(response,res);
// }catch(err){
//     console.log(err);
//     res.send(err.message);
// }}

// const removeRegistedUser =async function(req,res){
//     try{
//         // let emailID = req.body.emailId;
//         let response = await regEntity.Registration.destroy({
//             where:{emailId:req.body.emailId},returning: true
//         });
//         return finalResponse(response,res);
//     }catch(err){
//         console.log(err);
//         res.send(err.message);
//     }}
// // const authentication = function(headerRequest,res){
// //     let authenticationResponse = {};
// //     try{
// //         let data = headerRequest.headers.authorization
// //        let dd = data.substring(0, data.indexOf(' '));
// //        let dd2 = data.split(' ');
// //        if(dd2[0] == 'Bearer'){
// //         let decodeData = encodedecoding.decode(dd2[1])
// //         let emailId = 'maniakt@gmail.com';
// //         let response = registractionImpl.fetchRegistrationDetailsById(emailId);
// //         response.then((result)=>{
// //             if(result !=null){
// //                 authenticationResponse.status = true
// //                 authenticationResponse.message = ""
// //                 return authenticationResponse;

// //             }else{
// //                 authenticationResponse.status = false
// //                 authenticationResponse.message = "unable to login please check your token"
// //                 return authenticationResponse;

// //             }
// //             console.log(result._previousDataValues);
// //         }).catch((err)=>{
// //             authenticationResponse.status = false
// //             authenticationResponse.message = "unable to login please check your token"
// //             return authenticationResponse;

// //         })
// //        }

// //     }catch(err){
// //         console.log(err);

// //     }
// // }


// module.exports = {
//     loginRegistration,fetchRegistrationDetails,loginValidation,approvedAdminAccess,removeRegistedUser
// }