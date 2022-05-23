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
  const [reservation, setReservation] = useState({});

  const reset = () => {
    setGivenName("");
    setSurname("");
    setEmail("");
    setFlight();
    setSeat();
  };

  useEffect(() => {
    if (localStorage.getItem("reservation") !== undefined)
      setReservation(JSON.parse(localStorage.getItem("reservation")));
  }, []);

  useEffect(() => {
    localStorage.setItem("reservation", JSON.stringify(reservation));
  }, [reservation]);

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
