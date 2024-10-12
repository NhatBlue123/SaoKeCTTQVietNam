import { parse } from "csv-parse";
import fs from "fs";

// specify the path of the CSV file
const path = "./agribank_1500201113838_09-09_to_09-12-2024.csv";

// Create a readstream and parse options
const data = [];
fs.createReadStream(path)
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    // executed for each row of data
    // console.log(row);
    data.push(row);
  })
  .on("error", function (error) {
    // Handle the errors
    console.log(error.message);
  })
  .on("end", function () {
    // executed when parsing is complete
    console.log("File read successful");
    saveTransitison(data,"../../output/Agribank9-13.json")
  });

  function saveTransitison(data, outputPath) {
    try {
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`Data has been saved to ${outputPath}`);
    } catch (err) {
      console.error("Error writing file:", err);
    }
  }
