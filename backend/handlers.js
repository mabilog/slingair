"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = async (req, res) => {
  try {
    await flights;
    res.status(201).json({
      status: 201,
      flights: Object.keys(flights),
      message: "Flights data successfully provided",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 400,
      message: "Something went wrong getting flights",
      errorMessage: err,
    });
  }
};

const getFlight = async (req, res) => {
  try {
    const flightNum = req.query.flightNumber.toUpperCase();
    const seats = await flights[flightNum];
    res.status(201).json({
      status: 201,
      seats,
      message: "Flight Seats successfully provided",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 400,
      message: "Something went wrong getting flight",
      errprMessage: err,
    });
  }
};

const addReservation = async (req, res) => {
  try {
    // setting seat.isAvailble to false
    flights[req.body.flight].forEach((seat) => {
      if (seat.id === req.body.seat) seat.isAvailable = false;
    });
    const flightDetails = {
      id: uuidv4(),
      ...req.body,
    };
    await reservations.push({ ...flightDetails });
    res.status(201).json({
      status: 201,
      flightDetails: flightDetails,
      reservations,
      message: "Successfully added new reservation to reservations array",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 400,
      message: "Something went wrong while adding reservation",
      errorMessage: err,
    });
  }
};

const getReservations = async (req, res) => {
  try {
    await reservations;
    res.status(201).json({
      status: 201,
      flights: Object.keys(reservations),
      reservations,
      message: "Successfully received all reservations",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 400,
      message: "Something went wrong while getting reservations",
      errorMessage: err,
    });
  }
};

const getSingleReservation = async (req, res) => {
  try {
    const requestedReservation = await reservations.filter(
      (res) => res.id === req.query.id
    );
    res.status(200).json({
      status: 200,
      requestedReservation,
      message: "Successfully received single reservation",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 400,
      message: "Something went wrong while getting a reservation",
      errorMessage: err,
    });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.query;
    await reservations.filter((reservation) => reservation.id !== id);
    res.status(200).json({
      status: 200,
      message: "Something happened 🤷‍♂️",
      reservations: await reservations,
    });
    // if(res.status(200).json({
    //   status: 200,
    //   message: "Successfully deleted reservation",
    //   reservations,
    // });
    // res.status(404).json({
    //   status: 404,
    //   message: `No reservation id: ${id}`,
    //   reservations,
    // });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Something went wrong while deleting a reservation",
      errorMessage: err,
    });
  }
};

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
