// import React from "react";

// const TableStock = ({ tables }) => {
//   const isStockZero = Object.values(tables).some((value) => value === 0);
//   return (
//     <div className="table-stock">
//       <h2>Stock de Mesas</h2>
//       <div className="table-stock-list">
//         <div className="table-stock-item">
//           <span>Mesas de 2</span>
//           <span>{tables.table2}</span>
//         </div>
//         <div className="table-stock-item">
//           <span>Mesas de 4</span>
//           <span>{tables.table4}</span>
//         </div>
//         <div className="table-stock-item">
//           <span>Mesas de 6</span>
//           <span>{tables.table6}</span>
//         </div>
//         <div className="table-stock-item">
//           <span>Especiales</span>
//           <span>{tables.specialTable}</span>
//         </div>
//       </div>
//       {isStockZero && (
//        <div className="alert-tables">Ya no hay mesas disponibles de algún tipo!</div>
//       )}
//     </div>
//   );
// };

// export default TableStock;
import React, { useState } from "react";

const TableStock = ({ tables, onTablesUpdate }) => {
  const [editable, setEditable] = useState(false);
  const [editedTables, setEditedTables] = useState(tables);

  const isStockZero = Object.values(tables).some((value) => value === 0);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    onTablesUpdate(editedTables);
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
    setEditedTables(tables);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTables({ ...editedTables, [name]: parseInt(value) });
  };

  return (
    <div className="table-stock">
      <h2>Stock de Mesas</h2>
      <div className="table-stock-list">
        <div className="table-stock-item">
          <span>Mesas de 2</span>
          {editable ? (
            <input
              type="number"
              name="table2"
              value={!isNaN(editedTables.table2) ? editedTables.table2 : ''}
              onChange={handleChange}
            />
          ) : (
            <span>{tables.table2}</span>
          )}
        </div>
        <div className="table-stock-item">
          <span>Mesas de 4</span>
          {editable ? (
            <input
              type="number"
              name="table4"
              value={!isNaN(editedTables.table4) ? editedTables.table4 : ''}
              onChange={handleChange}
            />
          ) : (
            <span>{tables.table4}</span>
          )}
        </div>
        <div className="table-stock-item">
          <span>Mesas de 6</span>
          {editable ? (
            <input
              type="number"
              name="table6"
              value={!isNaN(editedTables.table6) ? editedTables.table6 : ''}
              onChange={handleChange}
            />
          ) : (
            <span>{tables.table6}</span>
          )}
        </div>
        <div className="table-stock-item">
          <span>Especiales</span>
          {editable ? (
            <input
              type="number"
              name="specialTable"
              value={!isNaN(editedTables.specialTable) ? editedTables.specialTable : ''}
              onChange={handleChange}
            />
          ) : (
            <span>{tables.specialTable}</span>
          )}
        </div>
      </div>
      {isStockZero && (
        <div className="alert-tables">
          Ya no hay mesas disponibles de algún tipo!
        </div>
      )}
      {editable ? (
        <div>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      ) : (
        <button onClick={handleEdit}>Editar</button>
      )}
    </div>
  );
};

export default TableStock;