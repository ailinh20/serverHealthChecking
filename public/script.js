let globalData;
const labels = [];
const dataC = {
  labels: labels,
  datasets: [
    {
      label: 'Nhịp tim',
      backgroundColor: 'red',
      borderColor: 'red',
      data: [],
      tension: 0.4,
    },
    {
      label: 'SpO2',
      backgroundColor: 'green',
      borderColor: 'green',
      data: [],
      tension: 0.4,
    }
  ],
};
const config = {
  type: 'line',
  data: dataC,
  options: {
    scales: {
      x: {
        ticks: {
          display: true,
          pointRadius: 4,
          color: 'rgba(0, 0, 0, 1)', // Đặt màu sắc của các điểm trên trục hoành
        },
      },
    },
  },
};

const canvas = document.getElementById('canvas');
const chart = new Chart(canvas, config);

let currentIndex =0;
let end = 0;
let lastTimestamp = null;

function updateChart() {
  chart.update();
}

function updateData(index) {
  //const { heartbeat, sp02 } = globalData[index];
  dataC.datasets[0].data.push(globalData[index].heartbeat);
  dataC.datasets[1].data.push(globalData[index].sp02);
  updateChart();
}

function fetchDataAndInitializeChart() {
  fetch('/api')
    .then(response => response.json())
    .then(data => {
      globalData = data;
      labels.push(...data.map(item => item.timing.substring(11, 19)));   
      lastTimestamp = data[data.length - 1].timing;
      currentIndex = globalData.length-5;
      end = globalData.length -1;
      updateChartConfiguration();

      //setInterval(fetchNewData, 5000); // Tự động cập nhật sau mỗi 5 giây
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu từ server:', error);
    });
}

const socket = io();

socket.on('newData', function(data) {
    globalData.push(data);
    currentIndex = globalData.length - 5;
    end = globalData.length - 1;
    labels.push(data.timing.substring(11, 19));

    updateData(globalData.length - 1);
    lastTimestamp = data.timing;

    updateChartConfiguration();
});


fetchDataAndInitializeChart();

const btnBack = document.getElementById('btnBack');
btnBack.addEventListener('click', () => {
  console.log(end-currentIndex);
  if (currentIndex > 0 && (end-currentIndex== 4)) {
    currentIndex--;
    end --;
  }
  else if(currentIndex > 0) currentIndex --;
    updateChartConfiguration();
    updateChart();
  
});

const btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', () => {
  if (currentIndex < globalData.length - 5) {
    currentIndex++;
    end++;
    updateChartConfiguration();
    updateChart();
  }
});
let predict = 0;
function updateChartConfiguration() {
  const displayedLabels = labels.slice(currentIndex, end+1);
  chart.config.options.scales.x.max = displayedLabels.length - 1;
  chart.config.data.labels = displayedLabels;

  const heartbeatData = globalData
    .slice(currentIndex, end+1)
    .map(item => item.heartbeat);
  const sp02Data = globalData
    .slice(currentIndex, end+1)
    .map(item => item.sp02);

  chart.config.data.datasets[0].data = heartbeatData;
  chart.config.data.datasets[1].data = sp02Data;

console.log("end: "+ end+"current: "+currentIndex);
  chart.update();
  const socket = io();
  socket.emit ('updateEndCurrent', { end, currentIndex});
  socket.on('prediction', function(data) {
    predict = data.prediction;
    //console.log(data.prediction)
    document.dispatchEvent(new Event('dataUpdated'));
  });
}

