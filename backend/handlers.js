"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const getFlights = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = await client.db("slingair");
    const flights = await db.collection("flights").distinct("flight");

    res.status(201).json({
      status: 201,
      flights,
      message: "Flights data successfully provided from the database",
    });
    client.close();
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
    const flightNumber = req.query.flightNumber.toUpperCase();
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = await client.db("slingair");

    const flight = await db
      .collection("flights")
      .findOne({ flight: flightNumber });

    flight.seats
      ? res.status(201).json({
          status: 201,
          seats: flight.seats,
          message: "Flight Seats successfully provided from database",
        })
      : res.status(201).json({
          status: 201,
          message: "Flight Seats successfully provided from database",
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
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("slingair");

    const flightDetails = {
      id: uuidv4(),
      ...req.body,
    };

    const bookSeat = await db
      .collection("flights")
      .updateOne(
        { flight: req.body.flight, "seats.id": req.body.seat },
        { $set: { "seats.$.isAvailable": false } }
      );

    if (bookSeat.matchedCount !== 1) throw new Error();

    const reservationConfirmation = await db
      .collection("reservations")
      .insertOne(flightDetails);

    if (!reservationConfirmation.acknowledged) throw new Error();

    res.status(201).json({
      status: 201,
      flightDetails,
      message: "Successfully added new reservation to reservations array",
    });
    client.close();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: "Something went wrong while adding reservation",
      errorMessage: err,
    });
  }
};

const getReservations = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = await client.db("slingair");

    const reservations = await db.collection("reservations").find().toArray();
    res.status(201).json({
      status: 201,
      reservations,
      message: "Successfully received all reservations",
    });
    client.close();
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
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const reservation = await client
      .db("slingair")
      .collection("reservations")
      .findOne({ id: req.query.reservationId });

    res.status(200).json({
      status: 200,
      reservation,
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
    const { reservationId, seat, flight } = req.query;
    console.log(req.query);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("slingair");
    console.log("db connected");

    const result = await db
      .collection("reservations")
      .deleteOne({ id: reservationId });

    if (result.deletedCount !== 1) throw new Error();

    const unbookSeat = await db
      .collection("flights")
      .updateOne(
        { flight: flight, "seats.id": seat },
        { $set: { "seats.$.isAvailable": true } }
      );

    if (unbookSeat.modifiedCount !== 1) throw new Error();

    const reservations = await db.collection("reservations").find().toArray();
    console.log(reservations);

    res.status(200).json({
      status: 200,
      message: "Something happened 🤷‍♂️",
      reservations,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Something went wrong while deleting a reservation",
      errorMessage: err,
    });
  }
};

const updateReservation = async (req, res) => {
  /*
    receive old seat, new seat, reservationId, 

  */
  try {
    console.log(req.body);
  } catch (err) {}
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
