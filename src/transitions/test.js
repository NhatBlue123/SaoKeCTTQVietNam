import fs from "fs";
import Papa from "papaparse"; // Import PapaParse for CSV parsing
const file = fs.readFileSync('../../output/test.csv', 'utf8');
const fetchData = async () =>{
const response = await fetch('../../output/Agri.csv');
const csvText = await response.text();
Papa.parse(csvText, {
  header: true, // Giữ header của file CSV
  complete: (results) => {
    console.log(results.data); // Xem dữ liệu
  },
  skipEmptyLines: true,
});
}
fetchData();