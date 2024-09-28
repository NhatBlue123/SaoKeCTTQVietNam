import fs from "fs";
import { PdfDataParser } from "pdf-data-parser";

async function main() {
  const pdfPath = "../../data/CT1-12BIDV.pdf";

  let parser = new PdfDataParser({
    url: pdfPath,
  });

  console.log("Loading PDF file... " + pdfPath);

  console.log("Parsing PDF...");
  const rows = await parser.parse();

  let printedRows = new Set();
  const unwantedKeywords = [
    "Postal address",
    "Swift",
    "Website",
    "Page",
    "Ngày GD",
    "Số CT/ Doc No",
    "TNX Date",
    "Chứng từ này được"

  ];
  const data = [];
  for (let i = 14; i < rows.length ; i++) {
    let rowString = JSON.stringify(rows[i]);
    if (!Array.isArray(rows[i]) || !rows[i]) {
      continue;
    }
    if (unwantedKeywords.some((keyword) => rowString.includes(keyword))) {
      continue;
    }

    if (!printedRows.has(rowString)) {
     data.push(rows[i]);
      // console.log(rows[i]);
      printedRows.add(rowString); // Thêm vào Set để đánh dấu đã in
    }
  }
  const dataLuu = [];
  for (let i = 0; i < data.length; i++) {
    // if (data[i][1] === undefined) {
    //   if (data[i + 1].at(1) === undefined) {
    //     if (data[i + 2].at(1) === undefined) {
    //       data[i + 1][0] += " " + data[i + 2].at(0);
    //     }
    //     data[i][0] += " " + data[i + 1].at(0);
    //   }
    //   data[i - 1][2] = data[i - 1][2] + " " + data[i][0];
    //   continue;
    // }
    if(data[i].length === 2)
    {
      let dataS = data[i+1];
      data[i].push(dataS[0]);
      data[i].push(dataS[1])
      console.log(data[i]);
    }
    dataLuu.push(data[i]);
  }
  
  saveTransitison(dataLuu, "../../output/BIDV112.json");
}
main();

function saveTransitison(data, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Data has been saved to ${outputPath}`);
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

// const data = [
//   ["1/9/2024", "100000", "NGUYEN NHAT CHUYEN"],
//   ["TIEN"],
//   ["1/9/2024", "100000", "NGUYEN HOANG CHUYEN TIEN"],
//   [
//     "1/9/2024",
//     "100000000",
//     "NGUYEN TUAN CHUYEN", //3
//   ],
//   [
//     "TIEN", // 4
//   ],
//   [
//     "CHO MIEN BAC", //5
//   ],
//   ["LU LUT"],
//   ["1/9/2024", "100000", "NGUYEN HOANG CHUYEN TIEN"],
// ];

// const dataLuu = [];

// for (let i = 0; i < data.length; i++) {
//   if (data[i][1] === undefined) {
//     if (data[i + 1].at(1) === undefined) {
//       if (data[i + 2].at(1) === undefined) {
//         data[i + 1][0] += " " + data[i + 2].at(0);
//       }
//       data[i][0] += " " + data[i + 1].at(0);
//     }
//     data[i - 1][2] = data[i - 1][2] + " " + data[i][0];
//     continue;
//   }
//   dataLuu.push(data[i]);
// }

// dataLuu.forEach((d) => {
//   console.log(d);
// });
