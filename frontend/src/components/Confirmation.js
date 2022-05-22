import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { FlightContext } from "./FlightContext";
import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const { reservation } = useContext(FlightContext);

  const [id, setId] = useState("");
  const [flightNum, setFlightNum] = useState("");
  const [seatNum, setSeatNum] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {}, [reservation]);

  return;
  {
    reservation ? (
      <Wrapper>
        <img src={tombstone} alt="" />
      </Wrapper>
    ) : null;
  }
};

const Wrapper = styled.div``;

export default Confirmation;
