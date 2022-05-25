import { useEffect, useContext } from "react";
import styled from "styled-components";

import { FlightContext } from "./FlightContext";
import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const { reservationId, reservation, setReservation } =
    useContext(FlightContext);

  useEffect(() => {
    fetch(`/api/get-reservation?reservationId=${reservationId}`)
      .then((res) => res.json())
      .then((data) => {
        setReservation(data.reservation);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {reservation ? (
        <>
          <ConfirmationWrapper>
            <ConfirmWrapper>
              <blockquote>Your flight is confirmed!</blockquote>
              <hr />
              <ul>
                <li>
                  <strong>Reservation #:</strong> {reservation.id}
                </li>
                <li>
                  <strong>Flight #:</strong> {reservation.flight}
                </li>
                <li>
                  <strong>seat #:</strong> {reservation.seat}
                </li>
                <li>
                  <strong>Name :</strong>{" "}
                  {reservation.givenName + " " + reservation.surname}
                </li>
                <li>
                  <strong>Email :</strong> {reservation.email}
                </li>
              </ul>
            </ConfirmWrapper>
            <img src={tombstone} alt="tombstone" />
          </ConfirmationWrapper>
        </>
      ) : (
        <div>There are no reservations in the storage</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  margin: auto;
  img {
    width: 300px;
  }
`;

const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px;
  border: 3px solid var(--color-alabama-crimson);
  border-radius: 3px;
  gap: 20px;
  blockquote {
    width: 100%;
    font-size: 28px;
    color: var(--color-alabama-crimson);
  }

  hr {
    width: 100%;
    size: 2px;
    color: var(--color-alabama-crimson);
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export default Confirmation;
