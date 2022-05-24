import { useEffect, useState } from "react";

const Reservation = () => {
  const [reserve, setReserve] = useState({});

  useEffect(() => {
    setReserve(JSON.parse(localStorage.getItem("reservation")));
  }, []);
  return <div>Reservation</div>;
};

export default Reservation;
