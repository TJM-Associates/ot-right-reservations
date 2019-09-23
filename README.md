# Restaurant Reservations

> A restaurant reservation booking app. Scaled the backend of the reviews microservice to handle +100M data points and over 1000 requests per second (RPS).

- Front end: ReactJS
- Back end: Node/express, Postgres, AWS

## Related Projects

  - https://github.com/lmwy-labs/Main-Gallery
  - https://github.com/lmwy-labs/Main-Menu
  - https://github.com/lmwy-labs/Main-Reviews

## Table of Contents

1. [Usage](Usage)
2. [Requirements](Requirements)
3. [Development](Development)
4. [CRUD APIs](CRUD APIs)

## Usage

Install node modules using npm install.

Initialize Postgres schema and generate dummy data for 10M restaurants and 100M reservations.
```sh
npm run sql
npm run seed
```

Launch webpack and host server.
```sh
npm run build:dev
npm run start:dev
```

This component uses port 3003, with the global component name Reservation.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## CRUD APIs

### Create a new reservation
Creates a new reservation for the given restaurant_id, reservation_date, reservation_time, and party_size.

### **POST** /api/restaurants/reservations

#### Sample Input:
```json
POST /api/restaurants/1/reservations
{
  "reservation_datetime": "2019-09-02 13:00:00",
  "seats": 3,
}
```
#### Sample Output:
{
  "id": "123",
  "restaurant_id": "r1",
  "reservation_datetime": "2019-09-02 13:00:00",
  "seats": 3,
}

---
### Retrieve available times for restaurant
Retrieves a list of available reservation times for the given restaurant_id, reservation_date, reservation_time, and party_size.

### **GET** /api/restaurants/:restaurantId/availability/date={reservation_date}&time={reservation_time}&seats={party_size}

#### Sample Input:
GET /api/restaurants/1/availability/date=2019-09-12&time=19:00&seats=3

#### Sample Output:
> ["19:00", "19:30", "20:00"]

---
### Update an existing reservation
Updates an existing reservation's party size given the reservation_id.

### **PATCH** /api/restaurants/:restaurantId/reservations/:reservationId

#### Sample Input:
```json
PATCH /api/restaurants/1/reservations/111
{
  "num_reserved_seats": 3,
}
```

#### Sample Output:
```json
{
  "reservation_id": 111,
  "seats": 3,
}
```

---
### Delete a reservation
Deletes the reservation given the reservation_id.

### **DELETE** /api/restaurants/:restaurantId/reservations/:reservationId
