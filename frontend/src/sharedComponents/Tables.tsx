import React from "react";
import "./Table.css";

interface Props<T> {
  headers: string[];
  data: T[];
}
const Tables = <T extends Record<string, any>>({ headers, data }: Props<T>) => {
  return (
    <>
      <table className="table ml-3">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th scope="col" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((row, rowIndex) => (
            // <tr key={rowIndex}>
            //   {headers.map((header, colIndex) => (
            //     <td key={colIndex}
            //     className={`w-auto ${colIndex % 2 === 0 ? "bg-danger text-white" : "bg-warning text-dark"}`}
            //     >
            //       {/* Dynamically access row data using the header */}
            //       {row[header] !== undefined ? row[header] : ""}
            //     </td>
            //   ))}
            // </tr>
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-primary"}`}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="w-auto" // Ensures column width fits data
                >
                  {/* Dynamically access row data using the header */}
                  {row[header] !== undefined ? row[header] : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
// {rowIndex%2===1?"bg-red-600":"bg-slate-400"}
export default Tables;
