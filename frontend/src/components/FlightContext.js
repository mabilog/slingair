import { createContext, useEffect, useState } from "react";

export const FlightContext = createContext("");

const FlightProvider = ({ children }) => {
  // SeatSelect.js
  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState();
  const [seat, setSeat] = useState();

  // Plane.js
  const [seating, setSeating] = useState([]);

  // FormSelect.js
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [reservationId, setReservationId] = useState({});

  const [reservation, setReservation] = useState({});

  const reset = () => {
    setGivenName("");
    setSurname("");
    setEmail("");
    setFlights();
    setSeat();
  };

  useEffect(() => {
    if (localStorage.getItem("reservationId") !== undefined)
      setReservationId(JSON.parse(localStorage.getItem("reservationId")));
  }, []);

  useEffect(() => {
    localStorage.setItem("reservationId", JSON.stringify(reservationId));
  }, [reservationId]);

  return (
    <FlightContext.Provider
      value={{
        flights,
        setFlights,
        flight,
        setFlight,
        seat,
        setSeat,
        seating,
        setSeating,
        givenName,
        setGivenName,
        surname,
        setSurname,
        email,
        setEmail,
        reservationId,
        setReservationId,
        reservation,
        setReservation,
        reset,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export default FlightProvider;
