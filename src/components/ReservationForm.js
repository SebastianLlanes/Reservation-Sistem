import React, { useState } from "react";

const ReservationForm = ({ addReservation }) => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const reservation = { id: generateId(), name, guests, date, time, phone };
    addReservation(reservation);
    setName("");
    setGuests("");
    setDate("");
    setTime("");
    setPhone("");
  };
  const generateId = () => {
    return Date.now().toString();
  };

  return (
    <form onSubmit={handleSubmit} className='form-container' >
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Comensales"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        
      />
      <input
        type="date"
        placeholder="Fecha"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Hora"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button>Agregar Reserva</button>
    </form>
  );
};

export default ReservationForm;
