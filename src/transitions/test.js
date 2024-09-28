 import fs from 'fs';

// // Đọc file JSON
// fs.readFile('../../output/VTBANK1012.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Lỗi khi đọc file:', err);
//         return;
//     }

//     // Sửa lỗi định dạng ngày tháng
//     // Giả sử định dạng ngày tháng đúng là dd/MM/yyyy HH:mm:ss
//     const correctedData = data.replace(/"\d{1,6}(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})"/g, '"$1"');

//     // Ghi lại file JSON
//     fs.writeFile('VTBANK1012_corrected.json', correctedData, 'utf8', (err) => {
//         if (err) {
//             console.error('Lỗi khi ghi file:', err);
//             return;
//         }
//         console.log('Đã sửa lỗi định dạng ngày tháng và ghi lại file JSON.');
//     });
// });


// Đọc file JSON
// fs.readFile('../../output/VTBANK1012_corrected.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Lỗi khi đọc file:', err);
//         return;
//     }

//     const transactions = JSON.parse(data);

//     const totalsByDate = transactions.reduce((acc, transaction) => {
//         const date = transaction[0].split(' ')[0]; // Lấy phần ngày tháng
//         const amount = parseFloat(transaction[2].replace(/\./g, '').replace(',', '.')); // Chuyển đổi số tiền thành số thực

//         if (!acc[date]) {
//             acc[date] = 0;
//         }
//         acc[date] += amount;
//         return acc;
//     }, {});

//     // Hiển thị kết quả
//     console.log('Tổng số tiền theo ngày:');
//     for (const [date, total] of Object.entries(totalsByDate)) {
//         console.log(`${date}: ${total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`);
//     }
// });
const totalsByDate = {};

// Duyệt qua các phần tử của mảng
data.forEach(item => {
  const date = item[1].split(' ')[0]; // Lấy ngày, bỏ phần giờ
  const amount = parseFloat(item[2].replace(/\./g, '').replace(',', '.')); // Lấy số tiền và chuyển thành số thực

  // Nếu ngày đã tồn tại trong đối tượng, cộng số tiền vào, nếu chưa thì khởi tạo
  if (totalsByDate[date]) {
    totalsByDate[date] += amount;
  } else {
    totalsByDate[date] = amount;
  }
});

// In ra kết quả
for (const date in totalsByDate) {
  console.log(`Ngày ${date}: ${totalsByDate[date].toLocaleString()} VND`);
}