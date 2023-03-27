// import React from "react";
// import ReservationCard from "./ReservationCard";
  
//   // Esta es la definición del componente ReservationList
//   // que recibe dos props: reservations y cancelReservation
//   const ReservationList = ({ reservations, cancelReservation }) => {
  
//     // Ordenamos las reservas por fecha y hora utilizando
//     // la función sort() y creando objetos Date para comparar
//     const sortedReservations = reservations.sort((a, b) => {
//       const dateA = new Date(`${a.date}T${a.time}`);
//       const dateB = new Date(`${b.date}T${b.time}`);
//       return dateA - dateB;
//     });
  
//     // Este es el JSX que será renderizado por el componente
//     return (
//       <div className="reservation-list">
//         {sortedReservations.map((reservation) => (
//           <ReservationCard
//             key={reservation.id}
//             reservation={reservation}
//             cancelReservation={cancelReservation}
//           />
//         ))}
//       </div>
//     );
//   };
  
//   // Exportamos el componente para que pueda ser utilizado en otros archivos
//   export default ReservationList;
  

  // En resumen, este componente recibe una lista de reservas (reservations) y una función para cancelar reservas (cancelReservation), y se encarga de ordenarlas por fecha y hora antes de renderizarlas. Luego, para cada reserva en la lista, renderiza un componente ReservationCard con las propiedades reservation y cancelReservation.

import React from "react";
import ReservationCard from "./ReservationCard";
import Papa from "papaparse";

// Esta es la definición del componente ReservationList
// que recibe dos props: reservations y cancelReservation
const ReservationList = ({ reservations, cancelReservation }) => {

  // Ordenamos las reservas por fecha y hora utilizando
  // la función sort() y creando objetos Date para comparar
  const sortedReservations = reservations.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  // Función que convierte los datos de las reservas en un archivo CSV
  const convertToCSV = () => {
    const csvData = Papa.unparse({
      fields: ["Nombre", "Comensales"],
      data: sortedReservations.map((reservation) => [
        reservation.name,
        reservation.guests,
      ]),
    });

    // Descargar el archivo CSV
    const downloadLink = document.createElement("a");
    downloadLink.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    downloadLink.download = "reservas.csv";
    downloadLink.click();
  };

  // Este es el JSX que será renderizado por el componente
  return (
    <div className="reservation-list">
      {/* <button onClick={convertToCSV}>DESCARGAR RESERVAS</button> */} 
      <button className="download-reservas" onClick={convertToCSV}>DESCARGAR RESERVAS</button>
      {sortedReservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          cancelReservation={cancelReservation}
        />
      ))}
     
    </div>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default ReservationList;