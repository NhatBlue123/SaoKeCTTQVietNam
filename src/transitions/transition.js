import fs from "fs";
import { PdfDataParser } from "pdf-data-parser";

async function main() {
  const pdfPath = "../../data/MTTQ_BIDV_18-19.pdf";

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
    "Chứng từ này được",
    "Chi nhánh:",
    "Chi nhánh TP Hà Nội",
    "Địa chỉ:",
    "Số 77, Phố Lạc Trung, Quận Hai Bà Trưng, TP Hà Nội"
  ];
  const data = [];
  for (let i = 9; i < rows.length; i++) {
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
    // if (data[i][3] === undefined) {
    //   // Tách chuỗi ở phần tử thứ 3 (data[i][2]) thành 2 phần
    //   const parts = data[i][2].split('"'); // Tách chuỗi bằng dấu "
    //   const amount = parts[0]; // Phần đầu là số tiền
    //   const details = parts[1]; // Phần sau là thông tin chi tiết
  
    //   // Cập nhật lại mảng với số tiền và thông tin chi tiết
    //   data[i] = [data[i][0], data[i][1], amount, details];
    // }
    // if (data[i][2] && data[i][3] === undefined) {
    //   // Tách chuỗi ở phần tử thứ 3 (data[i][2]) thành 2 phần
    //   const parts = data[i][2].split('"'); // Tách chuỗi bằng dấu "
      
    //   // Chỉ tách nếu có đủ 2 phần sau khi split
    //   if (parts.length >= 2) {
    //     const amount = parts[0]; // Phần đầu là số tiền
    //     const details = parts[1]; // Phần sau là thông tin chi tiết
        
    //     // Cập nhật lại mảng với số tiền và thông tin chi tiết
    //     data[i] = [data[i][0], data[i][1], amount, details];
    //   } else {
    //     console.log(`Lỗi: Chuỗi không có định dạng hợp lệ tại dòng ${i + 1}`);
    //   }
    //}
  
    // if (data[i].length === 2) {
    //   let dataS = data[i + 1];
    //   data[i].push(dataS[0]);
    //   data[i].push(dataS[1]);
    //   console.log(data[i]);
    // }
    // const regex = /^(\d{1,6})\/(.*)$/;
    // const match = data[i][0].match(regex);
    // const number = Number(match[1]);
    // const id = Math.floor(number/100)+"";
    // const day = "13/" + match[2];
    // data[i] = [id,day,data[i][1],data[i][2],data[i][3]];
    // console.log("ID: " + id);
    // console.log("Ngay: "+ "13/" + match[2]);
    //tach chuoi bidv 1017
    // if(data[i][4] === undefined)
    // {
    //   let originalString = data[i][3];
    //   let amountMatch = originalString.match(/^\d{1,3}(?:\.\d{3})*(?:,\d{1,3})?/);
    //   if (amountMatch) {
    //     let amount = amountMatch[0]; 
    //     let remainingString = originalString.substring(amount.length);  // Phần còn lại của chuỗi sau số tiền
    //     data[i] = [data[i][0],data[i][1],data[i][2],amount,remainingString]; 
    // }
    // }
    //tach chuoi bidv 1819
    if(data[i][3] == undefined)
    {
      data[i] = [data[i][0]," ",data[i][1],data[i][2]];
    }
    dataLuu.push(data[i]);
  }

  saveTransitison(dataLuu, "../../output/BIDV1819.json");
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
