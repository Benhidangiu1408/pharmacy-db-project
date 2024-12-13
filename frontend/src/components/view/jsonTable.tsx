import React, { useState } from "react";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface JsonTableProps {
  data: any[] | undefined;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const JsonTable: React.FC<JsonTableProps> = ({ data, onEdit, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  if (!data || data.length === 0) {
    return <div>No data to display.</div>;
  }

  const headers = Object.keys(data[0]);
  const initialVisibleHeaders = headers.slice(0, 6); // Show first 6 columns
  const remainingHeaders = headers.slice(6);       // Remaining columns

  const toggleRow = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  return (
    <table className="json-table">
      <thead className="json-table__header">
        <tr>
          <th className="json-table__header-cell"></th>
          {initialVisibleHeaders.map((header) => (
            <th key={header} className="json-table__header-cell">
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
          {remainingHeaders.length > 0 && (
            <th className="json-table__header-cell">...</th>
          )}
          <th className="json-table__header-cell">Actions</th>
        </tr>
      </thead>
      <tbody className="json-table__body">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr
              className="json-table__row"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <td className="json-table__cell">
                <button
                  className="json-table__button json-table__button--expand"
                  onClick={() => toggleRow(index)}
                >
                  {expandedRows.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </td>
              {initialVisibleHeaders.map((header) => (
                <td key={`${index}-${header}`} className="json-table__cell">
                  {JSON.stringify(item[header])}
                </td>
              ))}
              {remainingHeaders.length > 0 && (
                <td className="json-table__cell"></td> // Empty cell for alignment
              )}
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
            {/* Expanded Row */}
            {expandedRows.includes(index) && (
              <tr className="json-table__row json-table__row--expanded">
                <td colSpan={initialVisibleHeaders.length + 3}>
                  <div className="json-table__expanded-content">
                    {/* Display remaining fields */}
                    {remainingHeaders.map((header) => (
                      <div key={`${index}-${header}`} className="json-table__expanded-field">
                        <strong>{header.charAt(0).toUpperCase() + header.slice(1)}:</strong>{" "}
                        {JSON.stringify(item[header])}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

// ... (CSS remains mostly the same, you might want to adjust column widths)

export default JsonTable;