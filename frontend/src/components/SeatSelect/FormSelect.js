import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { FlightContext } from "../FlightContext";

const FormSelect = () => {
  const {
    flight,
    seat,
    givenName,
    setGivenName,
    surname,
    setSurname,
    email,
    setEmail,
    setReservationId,
  } = useContext(FlightContext);

  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const postBody = { flight, seat, givenName, surname, email };

    fetch("/api/add-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data));
      .then((data) => setReservationId(data.flightDetails.id))
      .then(() => history.push("/confirmed"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(seat);
  }, [seat]);

  return (
    <FormWrapper method="POST" onSubmit={(e) => handleFormSubmit(e)}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={(e) => setGivenName(e.target.value)}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={
          givenName === "" ||
          surname === "" ||
          email === "" ||
          seat === undefined
        }
      >
        Confirm
      </button>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 5px;
  padding: 30px;
  border: solid 2px var(--color-alabama-crimson);
  border-radius: 3px;
  button {
    background-color: var(--color-alabama-crimson);
    border: none;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export default FormSelect;
