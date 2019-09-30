const newrelic = require('newrelic');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./controllers/postgresDbHelpers.js');

const app = express();
app.locals.newrelic = newrelic;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/restaurants/:restaurantId', express.static(__dirname + '/../public'));
app.use('/', express.static(__dirname + '/../public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/restaurants/:restaurantId/reservations/', db.createReservation);
app.get('/api/restaurants/:restaurantId/availability/', db.getAvailableTimes);
app.get('/api/restaurants/:restaurantId/', db.getRestaurantInfo);
app.patch('/api/restaurants/:restaurantId/reservations/:reservationId', db.updateReservation);
app.delete('/api/restaurants/:restaurantId/reservations/:reservationId/', db.deleteReservation);

app.listen(3003, function() {
  console.log('Listening on Port 3003...');
});
