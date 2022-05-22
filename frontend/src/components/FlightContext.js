import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export default FlightProvider;
