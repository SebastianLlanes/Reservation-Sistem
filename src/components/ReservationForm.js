// Importar React y useState desde el paquete "react"
import React, { useState } from "react";

// Declaración de un componente llamado ReservationForm que recibe una función llamada addReservation como prop
const ReservationForm = ({ addReservation }) => {

  // Utilizar el hook useState para crear un estado para cada campo de entrada del formulario
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
 
  // Declarar una función que se ejecutará cuando se envíe el formulario
  const handleSubmit = (e) => {
    // Prevenir que la página se recargue al enviar el formulario
    e.preventDefault();
    // Crear un objeto de reserva con los valores actuales de cada estado y un id generado
    const reservation = { id: generateId(), name, guests, date, time, phone };
    // Llamar a la función addReservation pasando la reserva como argumento
    addReservation(reservation);
    // Reiniciar cada estado a su valor inicial
    setName("");
    setGuests("");
    setDate("");
    setTime("");
    setPhone("");
  };
  
  // Declarar una función que genera un id único basado en la fecha actual
  const generateId = () => {
    return Date.now().toString();
  };

  // Renderizar el formulario con cada campo de entrada y un botón para enviar el formulario
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

// Exportar el componente ReservationForm como default
export default ReservationForm;


// En resumen, este componente React es un formulario de reserva que utiliza el hook useState para mantener el estado de cada campo de entrada. Cuando el formulario se envía, se crea un objeto de reserva con los valores actuales de cada estado y se llama a una función pasada como prop para agregar la reserva a una lista. Después de agregar la reserva, cada estado se reinicia a su valor inicial. Además, el componente tiene una función que genera un id único basado en la fecha actual.