import React, { useState, useEffect } from "react";
import ReservationForm from "./components/ReservationForm";
import ReservationList from "./components/ReservationList";
import TableStock from "./components/TableStock";
import "./App.css";

const App = () => {
  // Define estados iniciales
  const [reservations, setReservations] = useState([]); // Lista de reservas
  const [tables, setTables] = useState({ // Stock de mesas
    table2: 10,
    table4: 8,
    table6: 6,
    specialTable: 2,
  });

  // Función para actualizar el stock de mesas
  const handleTablesUpdate = (updatedTables) => {
    setTables(updatedTables);
  };

  // Efecto para cargar las reservas guardadas en el almacenamiento local al cargar la página
  useEffect(() => {
    const storedReservations = localStorage.getItem("reservations");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  // Efecto para guardar las reservas en el almacenamiento local al actualizar las reservas
  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  // Función para guardar las reservas en el almacenamiento local y mostrar un mensaje de éxito
  const handleSaveReservations = () => {
    localStorage.setItem("reservationsBackup", JSON.stringify(reservations));
    alert("Reservas guardadas correctamente");
  };

    // Función para cargar las reservas guardadas del almacenamiento local y mostrar un mensaje de éxito o error
  const handleLoadReservations = () => {
    const storedReservations = localStorage.getItem("reservationsBackup");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
      alert("Reservas cargadas correctamente");
    } else {
      alert("No hay reservas guardadas");
    }
  };
  
  const [tableAvailability, setTableAvailability] = useState({
    table2: true,
    table4: true,
    table6: true,
    specialTable: true,
  });

  // Función para agregar una reserva
  const addReservation = (reservation) => {
    if (
      !reservation.guests ||
      reservation.guests === 0 ||
      isNaN(reservation.guests)
    ) {
      alert("Debe ingresar una cantidad de comensales.");
    } else {
      const tableType =
        reservation.guests <= 2
          ? "table2"
          : reservation.guests <= 4
          ? "table4"
          : reservation.guests <= 6
          ? "table6"
          : "specialTable";
      if (tableAvailability[tableType]) {  // Comprobar si hay mesas disponibles
        setReservations([...reservations, reservation]);
        updateTableStock(reservation, true);
      } else {
        alert(`Las mesas ${tableType} estan agotadas.`);
      }
    }
  };

  // Función para cancelar una reserva
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


   // Función para actualizar el stock de mesas
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
      <h1>CLORA</h1>
      <div className="container" key="reservation-container">
        <div className="app-container-container">
          <h2>Ingreso de Reserva</h2>
            <button className="save-button" onClick={handleSaveReservations}>GUARDAR RESERVAS</button>
            <button className="save-button" onClick={handleLoadReservations}>CARGAR RESERVAS</button>
        </div>
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
