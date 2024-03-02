const express = require('express');
const loginController = require('./contoller/RegistractionContoller');
const bookingContoller = require('./contoller/BookingDetailsContoller')
const authenticate = require('./Authorization')
const app = express();

app.listen(4001, () => {
  console.log('server started on port 4001');
});
app.use(express.json())
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}));

app.post('/registraction-logn',loginController.loginRegistration);
app.get('/fetch-registaction-details',authenticate.authenticate,loginController.fetchRegistrationDetails);
app.post('/save-booking-details',authenticate.authenticate,bookingContoller.saveBookingDetails);
app.get('/fetch-booking-details',authenticate.authenticate,bookingContoller.fetchBookingDetails);
app.delete('/remove-booking-details',authenticate.authenticate,bookingContoller.removeBookingDetails);
app.post('/fetch-booking-details-byid',authenticate.authenticate,bookingContoller.fetchBookingDetailsById);
app.put('/update-booking-details-byid',authenticate.authenticate,bookingContoller.updateBookingDetails);
app.post('/validation',loginController.loginValidation);
app.post('/fetch-booking-details-byEmail-id',authenticate.authenticate,bookingContoller.fetchBookingDetailsByEmailId);
