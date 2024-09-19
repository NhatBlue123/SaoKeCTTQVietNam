import jsonDataVTB from "../../output/test.json" assert { type: "json" };

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
      }else if (match[1].length === 5) {
        rawID = match[1];
        ID = rawID.slice(0, 3);
        day = rawID.slice(3);
      }else if (match[1].length === 6) {
        rawID = match[1];
        ID = rawID.slice(0, 4);
        day = rawID.slice(4);
      }else if (match[1].length === 7) {
        rawID = match[1];
        ID = rawID.slice(0, 5);
        day = rawID.slice(5);
      }else if (match[1].length === 8) {
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

console.log(filteredData);
