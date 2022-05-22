"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.status(201).json({ status: 201, flights: Object.keys(flights) });
};

const getFlight = (req, res) => {
  const flightNum = req.query.flightNumber.toUpperCase();
  const seats = flights[flightNum];
  res.status(201).json({
    status: 201,
    seats,
  });
};

const addReservation = (req, res) => {
  const flightDetails = {
    id: uuidv4(),
    ...req.body,
  };
  reservations.push({ ...flightDetails });
  res.status(201).json({ status: 201, flightDetails: flightDetails });
};

const getReservations = (req, res) => {
  res.status(201).json({ status: 201, flights: Object.keys(reservations) });
};

const getSingleReservation = (req, res) => {};

const deleteReservation = (req, res) => {};

const updateReservation = (req, res) => {};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
