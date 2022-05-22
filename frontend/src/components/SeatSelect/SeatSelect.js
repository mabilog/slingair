import { useEffect, useContext } from "react";

import styled from "styled-components";

import { FlightContext } from "../FlightContext";
import FlightSelect from "./FlightSelect";
import FormSelect from "./FormSelect";
import Plane from "./Plane";

const SeatSelect = () => {
  const { setFlights, reset } = useContext(FlightContext);

  useEffect(() => {
    fetch("/api/get-flights")
      .then((res) => res.json())
      .then((data) => setFlights(data.flights));

    // reset everything to default settings on load homepage
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FlightForm>
        <FlightSelect />
      </FlightForm>
      <TextWrapper>Select your seat and Provide your information!</TextWrapper>
      <FlightReservationWrapper>
        <Plane />
        <FormSelect />
      </FlightReservationWrapper>
    </>
  );
};

const TextWrapper = styled.h2`
  padding-top: 20px;
`;
const FlightForm = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-cadmium-red);
  width: 100%;
`;

const FlightReservationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SeatSelect;
