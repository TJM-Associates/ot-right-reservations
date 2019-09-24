-- psql -U $ROOT_USER -a -f db/postgres/schema.sql

DROP DATABASE IF EXISTS opentable;
CREATE DATABASE opentable;

\connect opentable;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS reservations;

CREATE TABLE restaurants (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(40) NOT NULL,
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  capacity_per_slot SMALLINT NOT NULL,
  UNIQUE (id)
);

CREATE TABLE reservations (
  id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
  restaurant_id INTEGER NOT NULL, -- don't forget to add foreign-key constratin after seeding
  reservation_datetime TIMESTAMPTZ NOT NULL,
  seats SMALLINT NOT NULL
);

-- COPY restaurants(name,open_time,close_time,capacity_per_slot) FROM '/Users/taehoonkim/Google Drive/hr-prep/sdc/ot-right-reservations/db/csv/restaurants.csv' DELIMITER ',' CSV HEADER;
-- COPY reservations(restaurant_id,reservation_datetime,seats) FROM '/Users/taehoonkim/Google Drive/hr-prep/sdc/ot-right-reservations/db/csv/reservations.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE reservations ADD CONSTRAINT fk_reservations FOREIGN KEY (restaurant_id) REFERENCES restaurants (id) MATCH FULL;
-- CREATE INDEX index_reservations_rest_id ON reservations(restaurant_id)

-- in EC2:
-- copy csv files to /var/lib/postgresql/
-- log into postgres
-- \COPY restaurants(name,open_time,close_time,capacity_per_slot) FROM '~/csv/restaurants.csv' DELIMITER ',' CSV HEADER;
-- \COPY reservations(restaurant_id,reservation_datetime,seats) FROM '~/csv/reservations.csv' DELIMITER ',' CSV HEADER;