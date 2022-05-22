import { useContext } from "react";
import { FlightContext } from "../FlightContext";

const FlightSelect = () => {
  const { setFlight, flights } = useContext(FlightContext);
  return (
    <form method="GET">
      <select
        onChange={(e) => setFlight(e.target.value)}
        defaultValue="Select a flight"
      >
        <option value="Select a flight" disabled>
          Select a flight
        </option>
        {flights?.map((flight) => (
          <option value={flight} key={flight}>
            {flight}
          </option>
        ))}
      </select>
    </form>
  );
};

export default FlightSelect;
