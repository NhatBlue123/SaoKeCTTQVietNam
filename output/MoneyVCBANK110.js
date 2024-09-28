import dataVC from "./test.json" assert { type: "json" };

const totalsByDate = {};

dataVC.map((item) => {
  const date = item[1].split(" ")[0]; // Lấy ngày, bỏ phần giờ

  // Kiểm tra nếu item[2] tồn tại và hợp lệ trước khi thao tác

  if (item[2]) {
    const amount = parseFloat(item[2].replace(/\./g, "").replace(",", ".")); // Lấy số tiền và chuyển thành số thực

    // Nếu ngày đã tồn tại trong đối tượng, cộng số tiền vào, nếu chưa thì khởi tạo
    if (totalsByDate[date]) {
      totalsByDate[date] += amount;
    } else {
      totalsByDate[date] = amount;
    }
  } else {
  }
});

// In ra kết quả
for (const date in totalsByDate) {
  console.log(`Ngày ${date}: ${totalsByDate[date]} VND`);
}
