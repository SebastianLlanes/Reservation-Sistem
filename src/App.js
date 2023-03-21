import React, { useState, useEffect } from "react";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import TableStock from "./components/TableStock";
import "./App.css";

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState({
    table2: 10,
    table4: 8,
    table6: 6,
    specialTable: 2,
  });

  const handleTablesUpdate = (updatedTables) => {
    setTables(updatedTables);
  };

  useEffect(() => {
    const storedReservations = localStorage.getItem("reservations");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);


  
  const [tableAvailability, setTableAvailability] = useState({
    table2: true,
    table4: true,
    table6: true,
    specialTable: true,
  });

  const addReservation = (reservation) => {
    if (
      !reservation.guests ||
      reservation.guests === 0 ||
      isNaN(reservation.guests)
    ) {
      alert("La cantidad de comensales debe ser un número mayor a 0.");
    } else {
      const tableType =
        reservation.guests <= 2
          ? "table2"
          : reservation.guests <= 4
          ? "table4"
          : reservation.guests <= 6
          ? "table6"
          : "specialTable";
      if (tableAvailability[tableType]) {
        setReservations([...reservations, reservation]);
        updateTableStock(reservation, true);
      } else {
        alert(`Las mesas ${tableType} estan agotadas.`);
      }
    }
  };

  const cancelReservation = (id) => {
    const filteredReservations = reservations.filter(
      (reservation) => reservation.id !== id
    );
    const reservationToCancel = reservations.find(
      (reservation) => reservation.id === id
    );
    setReservations(filteredReservations);
    updateTableStock(reservationToCancel, false);
    clearInterval(reservationToCancel.timerId);
  };

  const updateTableStock = (reservation, isReservation) => {
    let tableType;
    if (reservation.guests <= 2) {
      tableType = "table2";
    } else if (reservation.guests <= 4) {
      tableType = "table4";
    } else if (reservation.guests <= 6) {
      tableType = "table6";
    } else {
      tableType = "specialTable";
    }
    const updatedTables = { ...tables };
    updatedTables[tableType] += isReservation ? -1 : 1;
    setTables(updatedTables);
    const isTableAvailable = updatedTables[tableType] > 0;
    setTableAvailability({
      ...tableAvailability,
      [tableType]: isTableAvailable,
    });
  };
 
  return (
    <div className="app">
      <h1>Reservas Clora</h1>
      <div className="container" key="reservation-container">
        <h2>Ingreso de Reserva</h2>
        <ReservationForm addReservation={addReservation} />
        <TableStock  tables={tables} onTablesUpdate={handleTablesUpdate} />
      </div>
      <div className="container-reservationList">
        <ReservationList
          reservations={reservations}
          cancelReservation={cancelReservation}
          
        />
      </div>
    </div>
  );
};

export default App;
