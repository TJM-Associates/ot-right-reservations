# Reservation System

> System for booking a calendar event by time. Allow users to select a date from a calendar, which will show available reservation times on that day.

## Related Projects

  - https://github.com/lmwy-labs/Main-Gallery
  - https://github.com/lmwy-labs/Main-Menu
  - https://github.com/lmwy-labs/Main-Reviews

## Table of Contents

1. [Usage](##1. Usage)
2. [Requirements](# 2.Requirements)
3. [Development](#3. Development)
4. [CRUD APIs](#4. CRUD APIs)

## Usage

Install node modules using npm install.

Initialize MySQL schema and generate dummy data for 100 restaurants.
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

## 2. Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## 3. Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## 4. CRUD APIs

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
```json
{
  ["19:00", "19:30", "20:00"]
}
```

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
