import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface JsonTableProps {
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const JsonTable: React.FC<JsonTableProps> = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <div>No data to display.</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="json-table">
      <thead className="json-table__header">
        <tr>
          {headers.map((header) => (
            <th key={header} className="json-table__header-cell">
              {header.charAt(0).toUpperCase() + header.slice(1)} 
            </th>
          ))}
          <th className="json-table__header-cell">Actions</th>
        </tr>
      </thead>
      <tbody className="json-table__body">
        {data.map((item, index) => (
          <tr
            key={index}
            className="json-table__row"
            style={{ animationDelay: `${index * 0.1}s` }} // Add a delay based on index
          >
            {headers.map((header) => (
              <td key={`${index}-${header}`} className="json-table__cell">
                {JSON.stringify(item[header])}
              </td>
            ))}
            <td className="json-table__cell">
              <div className="json-table__action-buttons">
                <button
                  className="json-table__button json-table__button--edit"
                  onClick={() => onEdit(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className="json-table__button json-table__button--delete"
                  onClick={() => onDelete(item)}
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;
