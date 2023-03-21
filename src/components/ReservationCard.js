import React from "react"

const ReservationCard = ({ reservation, cancelReservation }) => {
  const handleCancelClick = () => {
    cancelReservation(reservation.id);
  };
  
  let tableClass = '';

if (reservation.guests <= 2) {
  tableClass = 'table2';
} else if (reservation.guests <= 4) {
  tableClass = 'table4';
} else if (reservation.guests <= 6) {
  tableClass = 'table6';
} else {
  tableClass = 'specialTable';
}
  console.log(tableClass);

  return (
    <div className={`reservation-card ${tableClass}`} key={reservation.id}>
      <div className="guests-circle">
        <span>{reservation.guests}</span>
      </div>
      <h3>{reservation.name}</h3>
      <p>Día: {reservation.date}</p>
      <p>Hora: {reservation.time}</p>
      <p>Teléfono: {reservation.phone}</p>
      <button onClick={handleCancelClick}>Cancelar Reserva</button>
    </div>
  );
};

export default ReservationCard;


