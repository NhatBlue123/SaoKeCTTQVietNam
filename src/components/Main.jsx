import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import Papa from "papaparse"; // Import PapaParse for CSV parsing

import {
  dataVCB110,
  dataVCB1012,
  dataBIDV112,
  dataVTB1012,
  dataVCB119,
  dataVTB179,
  dataAgibank913,
  dataVTB169,
  dataBIDV1017,
  dataBIDV1819
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
const Main = () => {
  const [value, setValue] = useState("AgriBank");
  const [rowData, setRowData] = useState([]);
  const [totalByDates, setTotalByDate] = useState(dataVCB110);
  const [highestMoney, setHighestMoney] = useState("10.460.780.225 VNĐ");
  const [lowestMoney, setLowestMoney] = useState("0 VND");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          const filteredData = results.data
            .map((item) => ({
              ID: item.id || "null",
              NgàyGiaoDịch: item.date,
              SốTiềnChuyển: item.money + " " + "đ",
              NộiDungChiTiết: item.desc,
            }))
            .filter((item) => item.ID !== "null");
          setRowData(filteredData);
        },
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (value === "VietTinBank") {
        console.log("VietTin");
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
                SốTiềnChuyển: item[1] + " " + "đ",
                NộiDungChiTiết: item[2],
              };
            }
            return null;
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      }
      else if (value === "AgriBank") {
        console.log("Agri");
        const data = await import("../../output/Agribank9-13.json");
        setTotalByDate(dataAgibank913);
        setHighestMoney("800.000.000 VNĐ");
        setLowestMoney("1.000 VNĐ");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);
              return {
                ID: item[0] || "null", 
                NgàyGiaoDịch: item[1],
                SốTiềnChuyển: item[2] + " " + "đ",
                NộiDungChiTiết: item[4],
              };
            
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      } else if (value === "VietComBank") {
        console.log("VietCom");
        setTotalByDate(dataVCB119);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VCB149.json");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);

            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[2] + " " + "đ",
              NộiDungChiTiết: item[3],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      }  else if (value === "BIDV") {
        console.log("BIDV");
        setTotalByDate(dataBIDV1017);
        setHighestMoney("200.000.000 VNĐ");
        setLowestMoney("1 VNĐ");
        const data = await import("../../output/BIDV1017.json");
        const filteredData = data.default
          .map((item) => {
            // const match = item[0].match(/^(\d{2}\/\d{2}\/\d{4})\s+([0-9.]+)$/);
            // const money = item[3].match(/^(-?\d+(?:\.\d+)?)(.*)$/);
            return {
              ID: item[0],
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[3] + " " + "đ",
              NộiDungChiTiết: item[4] + " " + item[2],
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
  const paginationPageSizeSelector = [100, 200, 500];

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
            <option>AgriBank</option>
            <option>VietComBank</option>
            <option>VietTinBank</option>
            <option>BIDV</option>
          </select>
        </div>
        <div>
          <p>Cao Nhất: {highestMoney}</p>
          <p>Thấp Nhất {lowestMoney}</p>
        </div>
      </div>
      <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
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
