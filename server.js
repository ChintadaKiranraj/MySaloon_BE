const express = require('express');
const loginController = require('./contoller/RegistractionContoller');
const bookingContoller = require('./contoller/BookingDetailsContoller')
const app = express();

app.listen(3001, () => {
  console.log('server started on port 3000');
});
app.use(express.json())

app.post('/registraction-logn',loginController.loginRegistration);
app.get('/fetch-registaction-details',loginController.fetchRegistrationDetails);
app.post('/save-booking-details',bookingContoller.saveBookingDetails);
app.get('/fetch-booking-details',bookingContoller.fetchBookingDetails);
app.delete('/remove-booking-details',bookingContoller.removeBookingDetails);
app.get('/fetch-booking-details-byid',bookingContoller.fetchBookingDetailsById);
app.put('/update-booking-details-byid',bookingContoller.updateBookingDetails);
