import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { NativeSelect } from "@mantine/core";
import jsonData from "../../output/VCBANK110.json";
import jsonDataVTB from "../../output/VTBANK1012.json";
const Main = () => {
  const [value, setValue] = useState("VietComBank 1-10");
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (value === "VietComBank 1-10") {
      const filteredData = jsonData
        .map((item) => {
          const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);
          if (match) {
            return {
              ID: match[2],
              NgàyGiaoDịch: match[1],
              SốTiềnChuyển: item[1],
              NộiDungChiTiết: item[2],
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setRowData(filteredData);
    } else if (value === "VietTinBank 10-12") {
      const filteredData = jsonDataVTB
        .map((item) => {
          const match = item[0].match(
            /^(\d{1,8})\/(\d{2})\/(\d{4})\s+(\d{2}:\d{2}:\d{2})$/
          );

          if (match) {
            // console.log(match);
            // console.log(match[1].length);
            let rawID;
            let ID;
            let day;
            if (match[1].length === 3) {
              rawID = match[1];
              ID = rawID.slice(0, 1);
              day = rawID.slice(1);
            } else if (match[1].length === 4) {
              rawID = match[1];
              ID = rawID.slice(0, 2);
              day = rawID.slice(2);
            } else if (match[1].length === 5) {
              rawID = match[1];
              ID = rawID.slice(0, 3);
              day = rawID.slice(3);
            } else if (match[1].length === 6) {
              rawID = match[1];
              ID = rawID.slice(0, 4);
              day = rawID.slice(4);
            } else if (match[1].length === 7) {
              rawID = match[1];
              ID = rawID.slice(0, 5);
              day = rawID.slice(5);
            } else if (match[1].length === 8) {
              rawID = match[1];
              ID = rawID.slice(0, 6);
              day = rawID.slice(6);
            }

            return {
              ID: ID,
              NgàyGiaoDịch: `${day}/${match[2]}/${match[3]} ${match[4]}`,
              SốTiềnChuyển: item[2],
              NộiDungChiTiết: item[1] + " " + item[3],
            };
          }
        })
        .filter((item) => item !== null);

      setRowData(filteredData);
    }
  }, [value]); 

  const pagination = true;
  const paginationPageSize = 5;
  const paginationPageSizeSelector = [10, 20, 30];

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "ID", filter: true, floatingFilter: true },
    { field: "NgàyGiaoDịch", filter: true, floatingFilter: true },
    { field: "SốTiềnChuyển", filter: true, floatingFilter: true },
    { field: "NộiDungChiTiết", flex: 4, filter: true, floatingFilter: true },
  ]);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <NativeSelect
        label="Chọn Ngân Hàng"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        data={["VietComBank 1-10", "VietTinBank 10-12", "VCB", "VCB"]}
      />
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </div>
  );
};

export default Main;
