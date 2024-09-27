import dataVC from "./VCB1012.json" assert { type: "json" };

const totalsByDate = {};

dataVC.map((item) => {
  const date = item[1]; // Lấy ngày

  // Kiểm tra nếu phần tử thứ 3 (số tiền) tồn tại trước khi gọi replace
  if (item[3]) {
    // Lấy số tiền và chuyển thành số thực (loại bỏ dấu phẩy)
    const amount = parseFloat(item[3].replace(/,/g, ''));

    // Nếu ngày đã tồn tại trong đối tượng, cộng số tiền vào, nếu chưa thì khởi tạo
    if (totalsByDate[date]) {
      totalsByDate[date] += amount;
    } else {
      totalsByDate[date] = amount;
    }
  } else {
    console.error(`Số tiền không tồn tại cho ngày ${date}`);
  }
});

// In ra kết quả
for (const date in totalsByDate) {
  console.log(`Ngày ${date}: ${totalsByDate[date]} VND`);
}
