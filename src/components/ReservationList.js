  import React from "react";
  import ReservationCard from "./ReservationCard";
  
  const ReservationList = ({ reservations, cancelReservation }) => {


   const sortedReservations = reservations.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

     return <div className="reservation-list">
      {sortedReservations.map((reservation) => (
         <ReservationCard
         key={reservation.id}
         reservation={reservation}
         cancelReservation={cancelReservation}
       />
      ))}
      </div>;
   };
   export default ReservationList;


