// // const BookingEntity = require('../entity/BookingDetailsEntity');
// // const BookingImpl = require('../ServerImpl/BookingDetailsImpl')
// const ExceptionHandling = require('../utils/ExceptionHandling')
// const userBookingModele = require('../models/UserBookingEntity')


// const saveBookingDetails = function(req,res){
//     try{

//     let response = userBookingModele.BookingDetailsEntity.create(req.body);
//     response.then((result)=>{
//         console.log(result);
//         res.send(ExceptionHandling.success(result._previousDataValues));
//     }).catch((err)=>{
//         console.log(err);
//         if(err.message != undefined){
//             res.send(ExceptionHandling.failuer(err.message))
//         }else{
//         res.send(ExceptionHandling.failuer(err.parent.detail));}
//     })
//     }catch(err){
//         console.log("Success"+err);
//         res.send(ExceptionHandling.failuer(err.message));
//     }
// }

// // function filterArray(data){
// //     let array = [];
// //     data.forEach((e)=>{
// //         array.push(e._previousDataValues);
// //     })
// //     console.log(array);
// //     return array;
// // }

// const fetchBookingDetails = function (req, res) {
//     try {
//         let response = userBookingModele.BookingDetailsEntity.findAll();
//         response.then((result) => {
//             console.log(result);
//             res.send(ExceptionHandling.success(ExceptionHandling.filterArray(result)));
//         }).catch((err) => {
//             console.log(err);
//             if (err.parent != undefined) {
//                 res.send(ExceptionHandling.failuer(err.message))
//             }
//             res.send(ExceptionHandling.failuer(err.parent.detail))
//         })

//     } catch (err) {
//         console.log(err);
//         res.send(ExceptionHandling.failuer(err.message));
//     }
// };

// const removeBookingDetails = function (req, res) {
//     try {
//         let response = userBookingModele.BookingDetailsEntity.destroy({
//             where: {id: req.body.id},returning: true
//         });
//         response.then((result) => {
//             console.log(result);
//             res.send(ExceptionHandling.success(result));
//         }).catch((err) => {
//             console.log(err);
//             if (err.parent != undefined) {
//                 res.send(ExceptionHandling.failuer(err.message));
//             }
//             res.send(ExceptionHandling.failuer(err.parent.detail))
//         })

//     } catch (err) {
//         console.log(err);
//     }
// }

// const fetchBookingDetailsById = function(req,res){
//     try{
//     let response = userBookingModele.BookingDetailsEntity.findByPk(req.body.id);
//     response.then((result)=>{
//         console.log(result._previousDataValues);
//         res.send(ExceptionHandling.success(result._previousDataValues));
//     }).catch((err)=>{
//         console.log(err);
//         res.send(ExceptionHandling.failuer(err.parent.detail));
//     })}catch(err){
//         console.log(err);
//         res.send(ExceptionHandling.failuer(err.message));
//     }

// }

// const updateBookingDetails = async function(req,res){
//     try{
//         let response ;
//     const recordToUpdate = await bookingEntity.BookingDetailsEntity.findByPk(req.body.id);
//     if(!recordToUpdate){
//         response = null;
//     }
//     response = await recordToUpdate.update(request.body);
//         response.then((result)=>{
//             if(!result){
//             console.log("Record is not found in Database."+result);
//             res.send(ExceptionHandling.failuer("Record is not found in Database."));
//             }else{
//             console.log(result._previousDataValues);
//             res.send(ExceptionHandling.success(result._previousDataValues))
//             }
//         }).catch((err)=>{
//             console.log(err);
//             res.send(ExceptionHandling.failuer(err.parent.detail));
//         })
//     }catch(err){
//         console.log(err);
//         res.send(ExceptionHandling.failuer(err.message));

//     }
// }

// const fetchBookingDetailsByEmailId = async function(req,res){
//     try{
//         let emailID = req.body.emailId;
//         let response = await bookingEntity.BookingDetailsEntity.findAll({
//             where:{
//                 regEmialId:emailID
//             },returning: true
//         });
//         response.then((result)=>{
//             console.log(result);
//             if(!result){
//                 res.send(ExceptionHandling.failuer("something went to rong"))
//             }{
//                 res.send(ExceptionHandling.success(ExceptionHandling.filterArray(result)));
//             }
//         }).catch((err)=>{
//             console.log(err);
//             if(err.message != undefined){
//                 res.send(ExceptionHandling.failuer(err.message));
//             }else{
//                 res.send(ExceptionHandling.failuer(err.parent.detail));
//             }
//         })

//     }catch(err){
//         console.log(err);
//         res.send(err.message);
//     }

// }

// module.exports= {
//     saveBookingDetails,fetchBookingDetails,removeBookingDetails,fetchBookingDetailsById,updateBookingDetails,fetchBookingDetailsByEmailId
// }