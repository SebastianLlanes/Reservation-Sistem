import React from "react";

const ReservationCard = ({ reservation, cancelReservation }) => {
  // Definimos una función para manejar el evento 'click' del botón "Cancelar Reserva"
  const handleCancelClick = () => {
    // Llamamos a la función 'cancelReservation' pasando el id de la reserva
    cancelReservation(reservation.id);
  };

  // Creamos una variable para almacenar la clase CSS que se aplicará al elemento que contiene la tarjeta de reserva
  let tableClass = '';

  // Si la reserva tiene 2 o menos invitados, asignamos la clase 'table2' a la variable 'tableClass'
  if (reservation.guests <= 2) {
    tableClass = 'table2';
  // Si la reserva tiene entre 3 y 4 invitados, asignamos la clase 'table4' a la variable 'tableClass'
  } else if (reservation.guests <= 4) {
    tableClass = 'table4';
  // Si la reserva tiene entre 5 y 6 invitados, asignamos la clase 'table6' a la variable 'tableClass'
  } else if (reservation.guests <= 6) {
    tableClass = 'table6';
  // Si la reserva tiene más de 6 invitados, asignamos la clase 'specialTable' a la variable 'tableClass'
  } else {
    tableClass = 'specialTable';
  }
 
  // Retornamos el JSX que se mostrará en la pantalla
  return (
    <div className={`reservation-card ${tableClass}`} key={reservation.id}>
      <div className="guests-circle">
        <span>{reservation.guests}</span>
      </div>
      <h3>{reservation.name}</h3>
      <p>Día: {reservation.date}</p>
      <p>Hora: {reservation.time}</p>
      <p>Teléfono: {reservation.phone}</p>
      <p>Notas: {reservation.notes}</p>
      <button onClick={handleCancelClick}>Cancelar Reserva</button>
    </div>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros lugares
export default ReservationCard;

