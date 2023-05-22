const labels = ['A', 'B', 'C', 'D'];

const dataC = {
  labels: labels,
  datasets: [
    {
      label: 'Nhiệt độ',
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: [], // Dữ liệu rỗng ban đầu
      tension: 0.4,
    },
    {
      label: 'Nhịp tim',
      backgroundColor: 'red',
      borderColor: 'red',
      data: [], // Dữ liệu rỗng ban đầu
      tension: 0.4,
    },
    {
      label: 'SpO2',
      backgroundColor: 'green',
      borderColor: 'green',
      data: [], // Dữ liệu rỗng ban đầu
      tension: 0.4,
    },
    {
      label: 'hour',
      backgroundColor: 'pink',
      borderColor: 'pink',
      data: [], // Dữ liệu rỗng ban đầu
      tension: 0.4,
    },
  ],
};

const config = {
  type: 'line',
  data: dataC,
};

const canvas = document.getElementById('canvas');
const chart = new Chart(canvas, config);

// Gửi yêu cầu GET đến API endpoint /getAll để lấy dữ liệu từ server
fetch('/api')
  .then(response => response.json())
  .then(data => {
    // Cập nhật dữ liệu từ server vào các mảng dữ liệu của các dataset
    data.forEach(item => {
      dataC.datasets[0].data.push(item.temp);
      dataC.datasets[1].data.push(item.heartbeat);
      dataC.datasets[2].data.push(item.sp02);
    //  dataC.datasets[3].data.push(item.hour);
      console.log('temp:', item.temp);
      console.log('sp02:', item.sp02);
    });

    // Cập nhật biểu đồ
    chart.update();
  })
  .catch(error => {
    console.error('Lỗi khi lấy dữ liệu từ server:', error);
  });
