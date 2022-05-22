import { useContext } from "react";
import styled from "styled-components";
import { FlightContext } from "../FlightContext";

const FlightSelect = () => {
  const { setFlight, flights } = useContext(FlightContext);
  return (
    <FormWrapper method="GET">
      <label>Flight Number: </label>
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
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px;
`;
export default FlightSelect;
