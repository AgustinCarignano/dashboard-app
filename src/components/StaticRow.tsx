import React from "react";

function StaticRow({ rowData }:{rowData:React.ReactElement[]}) {
  return (
    <tr>
      {rowData.map((data, i) => (
        <td key={i}>{data}</td>
      ))}
    </tr>
  );
}

export default StaticRow;
