// const{ DataTypes} = require('sequelize');
// const config = require('../config/postgreSQL');
// const seq = config.sequences;

// const Booking = seq.define('booking',{
//     booingId:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     },BookingUserId:{
//         type:DataTypes.INTEGER,
//         allowNull:false
//     },location:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },shopName:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },barberId:{
//         type:DataTypes.INTEGER,
//         allowNull:false
//     },shopId:{
//         type:DataTypes.INTEGER,
//         allowNull:false
//     },ShopOwnerId:{
//         type:DataTypes.INTEGER,
//         allowNull:false
//     },bookingDateTime:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },status:{
//         type:DataTypes.STRING,
//         allowNull:false
//     }},{
//         tableName:'booking',
//         schema:'public',
//         timestamps:false
// });
// Booking.sync({alter:true}).then(()=>{
//     console.log('success')
// }).catch((error)=>{
//     console.log('some thing went to rong!'+error);
// });
// module.exports = {Booking}