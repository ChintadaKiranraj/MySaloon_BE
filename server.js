const express = require('express');
const loginController = require('./contoller/RegistractionContoller');
const bookingContoller = require('./contoller/BookingDetailsContoller')
const authenticate = require('./Authorization')
const app = express();

app.listen(3001, () => {
  console.log('server started on port 3000');
});
app.use(express.json())

app.post('/registraction-logn',loginController.loginRegistration);
app.get('/fetch-registaction-details',authenticate.authenticate,loginController.fetchRegistrationDetails);
app.post('/save-booking-details',authenticate.authenticate,bookingContoller.saveBookingDetails);
app.get('/fetch-booking-details',authenticate.authenticate,bookingContoller.fetchBookingDetails);
app.delete('/remove-booking-details',authenticate.authenticate,bookingContoller.removeBookingDetails);
app.get('/fetch-booking-details-byid',authenticate.authenticate,bookingContoller.fetchBookingDetailsById);
app.put('/update-booking-details-byid',authenticate.authenticate,bookingContoller.updateBookingDetails);
app.get('/validation',loginController.loginValidation);
