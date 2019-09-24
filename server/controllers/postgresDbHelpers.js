const { Client } = require('pg');
const config = require('../../db/postgres/config.js');
const moment = require('moment');

const db = new Client({
  user: config.user,
  password: config.password,
  host: config.host,
  database: config.database,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to postgres.', err.stack);
  } else {
    console.log('Connected to postgres.');
  }
});

const parseInsertQueryResult = (data) => {
  const result = data.rows[0].row;
  const parsedInsertResult = result.slice(1, result.length - 1).split(',');
  return {
    reservation_id: parsedInsertResult[0],
    reservation_datetime: parsedInsertResult[1].replace(/['"]+/g, ''),
    seats: parsedInsertResult[2],
  };
};

const parsePatchQueryResult = (data) => {
  const result = data.rows[0].row;
  const parsedInsertResult = result.slice(1, result.length - 1).split(',');
  return {
    reservation_id: parsedInsertResult[0],
    seats: parsedInsertResult[1],
  };
};

// POST /api/restaurants/:restaurantId/reservations/
const createReservation = (req, res) => {
  const insertData = [Number(req.params.restaurantId), new Date(req.body.reservation_datetime), Number(req.body.seats)];
  const sql = 'INSERT INTO reservations(restaurant_id, reservation_datetime, seats) VALUES ($1, $2, $3) RETURNING (id, reservation_datetime, seats)';

  db.query(sql, insertData)
    .then((data) => {
      res.status(201).send(parseInsertQueryResult(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// GET /api/restaurants/1/availability/date=2019-09-12&time=19:00&seats=3
const getAvailableTimes = (req, res) => {
  const candidateTimeSlots = [];
  const date = new Date(req.query.date);
  const filter = [req.params.restaurantId, date.getDate()];
  const sql = `
    SELECT
      a.*,
      b.*
    FROM
    (SELECT 
      reservation_datetime,
      SUM(seats),
      restaurant_id
    FROM reservations
    WHERE restaurant_id = ($1)
    AND extract(day from reservation_datetime) = ($2)
    GROUP BY reservation_datetime, restaurant_id) AS a
    JOIN
    (SELECT * FROM restaurants) AS b
    ON a.restaurant_id = b.id`;

  db.query(sql, filter)
    .then((data) => {
      const queryOutputArr = data.rows;
      const restaurantCapacity = queryOutputArr[0] ? Number(queryOutputArr[0].capacity_per_slot) : 0;
      const reservationTime = Number(req.query.time.slice(0, 2));
      const reservationDate = req.query.date;
      const open = queryOutputArr[0] ? Number(queryOutputArr[0].open_time.slice(0, 2)) : 0;
      const close = queryOutputArr[0] ? Number(queryOutputArr[0].close_time.slice(0, 2)) : 0;
      const lowerBound = (reservationTime - 2 > open) && (reservationTime - 2 < close) ? reservationTime - 2 : open;
      const upperBound = (reservationTime + 2 > open) && (reservationTime + 2 < close) ? reservationTime + 2 : close;
      
      if (reservationTime > close || reservationTime < open) {
        res.status(200).send([]);
      } else {
        let results = [];
        for (let i = lowerBound; i <= upperBound; i++) {
          candidateTimeSlots.push(i + ':00:00');
        }
        const reservedTimes = queryOutputArr.map((v) => moment(v.reservation_datetime, ['YYYY-MM-DDTHH:mm:ss.SSS']).format('HH:mm:ss'));

        for (let j = 0; j < reservedTimes.length; j++) {
          if (candidateTimeSlots.includes(reservedTimes[j]) && Number(queryOutputArr[j].sum) <= restaurantCapacity) {
            results.push(reservedTimes[j]);
          }
        }

        res.status(200).send(results);
      }
  })
  .catch((err) => {
    console.log(req.params.restaurantId);
    console.log(err.stack);
    res.status(500).send(err);
  });
};

// PATCH /api/restaurants/:restaurantId/reservations/:reservationId
const updateReservation = (req, res) => {
  const updateData = [Number(req.body.seats), Number(req.params.reservationId), Number(req.params.restaurantId)];
  const sql = 'UPDATE reservations SET seats = ($1) WHERE id = ($2) AND restaurant_id = ($3) RETURNING (id, seats)';

  db.query(sql, updateData)
    .then((data) => {
      res.status(200).send(parsePatchQueryResult(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// DELETE /api/restaurants/:restaurantId/reservations/:reservationId
const deleteReservation = (req, res) => {
  const updateData = [Number(req.params.reservationId), Number(req.params.restaurantId)];
  const sql = 'DELETE FROM reservations WHERE id = ($1) AND restaurant_id = ($2)';

  db.query(sql, updateData)
    .then(() => {
      res.status(204).send('Successfully deleted reservation.');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// GET /api/restaurants/:restaurantId
const getRestaurantInfo = (req, res) => {
  const updateData = [Number(req.params.restaurantId)];
  const sql = 'SELECT open_time, close_time FROM restaurants where id = ($1)';

  db.query(sql, updateData)
    .then((data) => {
      res.status(200).send(data.rows[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  createReservation,
  getAvailableTimes,
  updateReservation,
  deleteReservation,
  getRestaurantInfo,
};
