const express = require('express');
// const regRoutes = require('./routes/RegRoutes');
// const userBookingRoutes = require('./routes/UserBookingRoutes');
const UserRoutes = require('./routes/UsersRoutes');
const SopRoutes = require('./routes/ShopOwnersRoutes');
const Barber = require('./routes/BarberApplicationRoute');
const app = express();

app.listen(4002, () => {
  console.log('server started on port 4002');
});
app.use(express.json())
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}));

app.use('', UserRoutes.router);
app.use('', SopRoutes.router);
app.use('',Barber.router);


