import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
import fs from "fs";
import {
  VietTinBank,
  dataVCB119,
  dataVCB110,
  AgriBank,
  BIDV,
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
              Bank: item.bank || "null",
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
        setTotalByDate(VietTinBank);
        setHighestMoney("5.000.000.000");
        setLowestMoney("0 VNĐ");
        const response = await fetch("../../output/Vietin.csv");
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true, // Giữ header của file CSV
          complete: function (results) {
            const filteredData = results.data
              .map((item) => ({
                ID: item.id || "null",
                Bank: item.bank || "null",
                NgàyGiaoDịch: item.date,
                SốTiềnChuyển: item.money + " " + "đ",
                NộiDungChiTiết: item.desc,
              }))
              .filter((item) => item.ID !== "null");
            setRowData(filteredData);
          },
        });
      } else if (value === "AgriBank") {
        console.log("Agri");
        let tongGiaoDich = 0;
        const response = await fetch("../../output/Agri.csv");
        const csvText = await response.text();
        setTotalByDate(AgriBank);
        setHighestMoney("800.000.000 VNĐ");
        setLowestMoney("1.000 VNĐ");
        Papa.parse(csvText, {
          header: true,
          complete: function (results) {
            const filteredData = results.data
              .map((item) => ({
                ID: item.id || "null",
                Bank: item.bank || "null",
                NgàyGiaoDịch: item.date,
                SốTiềnChuyển: item.money + " " + "đ",
                NộiDungChiTiết: item.desc,
              }))
              .filter((item) => item.ID !== "null");
            setRowData(filteredData);
          },
        });
        console.log(tongGiaoDich);
        // setRowData(filteredData.data);
      } else if (value === "VietComBank") {
        console.log("VietCom");
        setTotalByDate(dataVCB119);
        setHighestMoney("10.460.780.225 VNĐ");
        setLowestMoney("0 VNĐ");
        const data = await import("../../output/VCB149.json");
        const filteredData = data.default
          .map((item) => {
            return {
              ID: item[0],
              Bank: "VietComBank",
              NgàyGiaoDịch: item[1],
              SốTiềnChuyển: item[2] + " " + "đ",
              NộiDungChiTiết: item[3],
            };
          })
          .filter((item) => item !== null);

        setRowData(filteredData);
      } else if (value === "BIDV") {
        console.log("BIDV");
        setTotalByDate(BIDV);
        setHighestMoney("2.000.000.000 VNĐ");
        setLowestMoney("1 VNĐ");
        const response = await fetch("../../output/BIDV.csv");
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true, // Giữ header của file CSV
          complete: function (results) {
            const filteredData = results.data
              .map((item) => ({
                ID: item.id || "null",
                Bank: item.bank || "null",
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

    fetchData();
  }, [value]);

  const pagination = true;
  const paginationPageSize = 30;
  const paginationPageSizeSelector = [100, 200, 500, 2000, 50000, 100000];
  let darkmode = localStorage.getItem("darkmode");
  const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    const agGridElement = document.getElementsByClassName("ag-theme-quartz")[0];

    // Kiểm tra nếu phần tử tồn tại
    if (agGridElement) {
      // Thiết lập các biến CSS cho chế độ tối
      agGridElement.style.setProperty("--ag-foreground-color","white");
      agGridElement.style.setProperty(
        "--ag-background-color",
        "var(--base-variant)"
      );
      agGridElement.style.setProperty("--ag-header-foreground-color", "white");
      agGridElement.style.setProperty(
        "--ag-header-background-color",
        "var(--base-variant)"
      );
      agGridElement.style.setProperty(
        "--ag-odd-row-background-color",
        "rgba(0, 0, 0, 0.03)"
      );
      agGridElement.style.setProperty(
        "--ag-header-column-resize-handle-color",
        "white"
      );
    }
  };

  const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
    const agGridElement = document.getElementsByClassName("ag-theme-quartz")[0];

  // Kiểm tra nếu phần tử tồn tại
  if (agGridElement) {
    // Xóa toàn bộ các biến CSS đã áp dụng khi bật dark mode
    agGridElement.style.removeProperty('--ag-foreground-color');
    agGridElement.style.removeProperty('--ag-background-color');
    agGridElement.style.removeProperty('--ag-header-foreground-color');
    agGridElement.style.removeProperty('--ag-header-background-color');
    agGridElement.style.removeProperty('--ag-odd-row-background-color');
    agGridElement.style.removeProperty('--ag-header-column-resize-handle-color');
  }
  };

  if (darkmode === "active") enableDarkmode();
  function darkMode() {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  }
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "ID", filter: true, floatingFilter: true },
    { field: "Bank", floatingFilter: true },
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
      <div>
        <button id="theme-switch" onClick={darkMode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" />
          </svg>
        </button>
      </div>
      <div className="mb-3 flex justify-between">
        <div>
          <label className="text-lg" for="banks">
            Chọn Ngân Hàng 🏦
          </label>
          <select
            name="banks"
            id="select-banks"
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
      <div className="flex justify-center items-center">
        <p className="">Tổng tiền giao dịch theo ngày</p>
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
