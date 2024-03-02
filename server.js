const express = require('express');
const loginController = require('./contoller/RegistractionContoller');
const regRoutes = require('./routes/RegistractionRoutes')
const app = express();
app.listen(3001, () => {
  console.log('server started on port 3000');
});
app.use(express.json())

app.post('/registraction-logn',loginController.loginRegistration);

app.get('/fetch-registaction-details',loginController.fetchRegistrationDetails)
