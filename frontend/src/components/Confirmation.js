import { useEffect, useState } from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const [reserve, setReserve] = useState({});

  useEffect(() => {
    setReserve(JSON.parse(localStorage.getItem("reservation")));
  }, []);

  return (
    <Wrapper>
      {reserve ? (
        <>
          <ConfirmationWrapper>
            <ConfirmWrapper>
              <blockquote>Your flight is confirmed!</blockquote>
              <hr />
              <ul>
                <li>
                  <strong>Reservation #:</strong> {reserve.id}
                </li>
                <li>
                  <strong>Flight #:</strong> {reserve.flight}
                </li>
                <li>
                  <strong>seat #:</strong> {reserve.seat}
                </li>
                <li>
                  <strong>Name :</strong>{" "}
                  {reserve.givenName + " " + reserve.surname}
                </li>
                <li>
                  <strong>Email :</strong> {reserve.email}
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
