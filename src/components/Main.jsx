import React, { useEffect, useState,Suspense } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
// import jsonData from "../../output/VCBANK110.json";
// import jsonDataVTB from "../../output/VTBANK1012.json";
// import jsonDataVCB1012 from "../../output/VCB1012New.json";
// import jsonDataBIDV112 from "../../output/BIDV112.json";
// import jsonDataVCB119 from "../../output/VCB119.json";
import {
  dataVCB110,
  dataVCB1012,
  dataBIDV112,
  dataVTB1012,
  dataVCB119,
} from "../data/TotalByDates";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import "@mantine/charts/styles.css";
const Main = () => {
  const [value, setValue] = useState("VietComBank 1-10/9");
  const [rowData, setRowData] = useState([]);
  const [totalByDates, setTotalByDate] = useState(dataVCB110);
  const [highestMoney, setHighestMoney] = useState("10.460.780.225 VNĐ");
  const [lowestMoney, setLowestMoney] = useState("0 VND");
  useEffect(() => {
    const fetchData = async () => {
      if (value === "VietComBank 1-10/9") {
        const data = await import("../../output/VCBANK110.json");
        setTotalByDate(dataVCB110);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const filteredData = data.default
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
      }
      else if (value === "VietComBank 11-9") {
        setTotalByDate(dataVCB119);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VCB119.json");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);

            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[2],
              NộiDungChiTiết: item[3],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      } else if (value === "VietTinBank 10-12/9") {
        setTotalByDate(dataVTB1012);
        setHighestMoney("5.000.000.000 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VTBANK1012.json");
        const filteredData = data.default
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
      } else if (value === "VietComBank 10-12/9") {
        setTotalByDate(dataVCB1012);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VCB1012New.json");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);

            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[3],
              NộiDungChiTiết: item[2],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      } else if (value === "BIDV 1-12/9") {
        setTotalByDate(dataBIDV112);
        setHighestMoney("2.000.000.000 VNĐ");
        setLowestMoney("1 VNĐ");
        const data = await import("../../output/BIDV112.json");

        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);

            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[2],
              NộiDungChiTiết: item[3],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      }
      else if (value === "VietComBank 12-9") {
        setTotalByDate(dataVCB119);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VCB129.json");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);

            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[2],
              NộiDungChiTiết: item[3],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      }
      else if (value === "VietComBank 13-9") {
        setTotalByDate(dataVCB119);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VCB139.json");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);

            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[2],
              NộiDungChiTiết: item[3],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      }
    };

    fetchData();
  }, [value]);

  const pagination = true;
  const paginationPageSize = 30;
  const paginationPageSizeSelector = [30, 40, 50];

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "ID", filter: true, floatingFilter: true },
    { field: "NgàyGiaoDịch", filter: true, floatingFilter: true },
    { field: "SốTiềnChuyển", filter: true, floatingFilter: true },
    { field: "NộiDungChiTiết", flex: 4, filter: true, floatingFilter: true },
  ]);

  return (
    <>
      {/* <div>
        <NativeSelect
          label="Chọn Ngân Hàng"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          data={[
            "VietComBank 1-10",
            "VietComBank 10-12",
            "VietTinBank 10-12",
            "BIDV 1-12",
          ]}
        />
      </div> */}
      <div className="mb-3 flex justify-between">
        <div>
          <label className="text-lg" for="banks">
            Chọn Ngân Hàng 🏦
          </label>
          <select
            name="banks"
            onChange={(event) => setValue(event.currentTarget.value)}
          >
            <option>VietComBank 1-10/9</option>
            <option>VietComBank 10-12/9</option>
            <option>VietComBank 11-9</option>
            <option>VietComBank 12-9</option>
            <option>VietComBank 13-9</option>
            <option>VietTinBank 10-12/9</option>
            <option>BIDV 1-12/9</option>
          </select>
        </div>
        <div>
          <p>Cao Nhất: {highestMoney}</p>
          <p>Thấp Nhất {lowestMoney}</p>
        </div>
      </div>
      <div className="p-15 flex justify-center">
        <BarChart
          style={{
            flex: "1",
          }}
          width={1300}
          height={300}
          data={totalByDates}
        >
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 200, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="VND" fill="#8884d8" barSize={50} />
        </BarChart>
      </div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
};

export default Main;
