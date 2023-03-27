import React, { useState } from "react";

const TableStock = ({ tables, onTablesUpdate }) => {

  // Utilizamos el hook de estado "useState" para definir el estado "editable" y "editedTables"
  const [editable, setEditable] = useState(false);
  const [editedTables, setEditedTables] = useState(tables);

  // Utilizamos el método "some" de Object para verificar si el stock de alguna mesa es cero
  const isStockZero = Object.values(tables).some((value) => value === 0);

  // Definimos el manejador de evento "handleEdit", que establece el estado "editable" a true
  const handleEdit = () => {
    setEditable(true);
  };

  // Definimos el manejador de evento "handleSave", que llama a "onTablesUpdate" y establece "editable" a false
  const handleSave = () => {
    onTablesUpdate(editedTables);
    setEditable(false);
  };

  // Definimos el manejador de evento "handleCancel", que establece "editable" a false y "editedTables" a "tables"
  const handleCancel = () => {
    setEditable(false);
    setEditedTables(tables);
  };

  // Definimos el manejador de evento "handleChange", que actualiza el estado "editedTables" con los valores ingresados en el formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTables({ ...editedTables, [name]: parseInt(value) });
  };

  return (
    <div className="table-stock">
      <h2>Stock de Mesas</h2>
      <div className="table-stock-list">
        <div className="table-stock-item">
          <span className="stock-table2">Mesas de 2</span>
          {editable ? (
            <input
              className="stock-table2"
              type="number"
              name="table2"
              value={!isNaN(editedTables.table2) ? editedTables.table2 : ''}
              onChange={handleChange}
            />
          ) : (
            <span className="stock-table2">{tables.table2}</span>
          )}
        </div>
        <div className="table-stock-item">
          <span className="stock-table4">Mesas de 4</span>
          {editable ? (
            <input
              className="stock-table4"
              type="number"
              name="table4"
              value={!isNaN(editedTables.table4) ? editedTables.table4 : ''}
              onChange={handleChange}
            />
          ) : (
            <span className="stock-table4">{tables.table4}</span>
          )}
        </div>
        <div className="table-stock-item">
          <span className="stock-table6">Mesas de 6</span>
          {editable ? (
            <input
              className="stock-table6"
              type="number"
              name="table6"
              value={!isNaN(editedTables.table6) ? editedTables.table6 : ''}
              onChange={handleChange}
            />
          ) : (
            <span className="stock-table6">{tables.table6}</span>
          )}
        </div>
        <div className="table-stock-item">
          <span className="stock-specialTable">Especiales</span>
          {editable ? (
            <input
              className="stock-specialTable"
              type="number"
              name="specialTable"
              value={!isNaN(editedTables.specialTable) ? editedTables.specialTable : ''}
              onChange={handleChange}
            />
          ) : (
            <span className="stock-specialTable">{tables.specialTable}</span>
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
          <button onClick={handleSave}>GUARDAR</button>
          <button onClick={handleCancel}>CANCELAR</button>
        </div>
      ) : (
        <button onClick={handleEdit}>EDITAR</button>
      )}
    </div>
  );
};

export default TableStock;