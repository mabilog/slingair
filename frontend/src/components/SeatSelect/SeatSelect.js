import { useEffect, useContext } from "react";

import styled from "styled-components";

import { FlightContext } from "../FlightContext";
import FlightSelect from "./FlightSelect";
import FormSelect from "./FormSelect";
import Plane from "./Plane";

const SeatSelect = () => {
  // const [flights, setFlights] = useState([]);
  // const [flight, setFlight] = useState();
  // const [seat, setSeat] = useState();
  const { setFlights } = useContext(FlightContext);

  useEffect(() => {
    fetch("/api/get-flights")
      .then((res) => res.json())
      .then((data) => setFlights(data.flights));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FlightForm>
        {/* <FlightSelect setFlight={setFlight} flights={flights} /> */}
        <FlightSelect />
      </FlightForm>
      <h2>Select your seat and Provide your information!</h2>
      <FlightReservationWrapper>
        <Plane />
        <FormSelect />
      </FlightReservationWrapper>
    </>
  );
};

const FlightForm = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-cadmium-red);
  width: 100%;
  height: 50px;
`;

const FlightReservationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SeatSelect;
