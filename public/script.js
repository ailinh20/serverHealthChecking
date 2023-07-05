var age = "25";
var heart;
var O2;
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

function calculateAverage(data) {
  const sum = data.reduce((total, value) => total + value, 0);
  const average = sum / data.length;
  return average;
}
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
      console.log(end);
      updateHeartAndO2(data.lenght - 1);
      updateChartConfiguration();

      setInterval(fetchNewData, 5000); // Tự động cập nhật sau mỗi 5 giây
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu từ server:', error);
    });
}
function updateHeartAndO2(newHeart, newO2) {
  heart = newHeart;
  O2 = newO2;
  document.dispatchEvent(new Event('dataUpdated'));
}

function fetchNewData() {
  fetch('/api')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0 && data[data.length - 1].timing !== lastTimestamp) {
        globalData = data;
        currentIndex = globalData.length-5;
        end = globalData.lenght -1;
        updateHeartAndO2(data[data.length - 1].heartbeat, data[data.length - 1].sp02);
        labels.push(data[data.length - 1].timing.substring(11, 19));

        updateData(data.length - 1);
        lastTimestamp = data[data.length - 1].timing;

        updateChartConfiguration();
      }
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu từ server:', error);
    });
}

fetchDataAndInitializeChart();

const btnBack = document.getElementById('btnBack');
btnBack.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    end --;
    updateChartConfiguration();
    updateChart();
  }
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

  chart.update();
     // Tính trung bình cộng của 5 dữ liệu gần nhất
     if (end - currentIndex + 1 >= 5) {
      const recentHeartpData = heartbeatData.slice(-5);
      const recentSpo2Data = sp02Data.slice(-5);
  
      const averageHeart = calculateAverage(recentHeartpData);
      const averageSpo2 = calculateAverage(recentSpo2Data);
      updateHeartAndO2(averageHeart, averageSpo2);
     }
}
// canvas.addEventListener('click', handleChartClick);

// function handleChartClick(event) {
//   const chartArea = chart.chartArea;
//   const offsetX = event.clientX - chartArea.left;
//   const dataIndex = Math.floor((offsetX / chartArea.width) * (chart.data.labels.length - 1));
//   const barWidth = chartArea.width / (chart.data.labels.length - 1);
//   if (dataIndex >= 0 && dataIndex < chart.data.labels.length) {
//     const clickedData = globalData[currentIndex + dataIndex];
//     const tooltip = document.getElementById('tooltip');
//     tooltip.style.display = 'block';
//     const tooltipLeft = chartArea.left + (dataIndex * barWidth);
//     const tooltipTop = chartArea.top + chart.scales.y.top;

//     tooltip.style.left = tooltipLeft + 'px';
//     tooltip.style.top = tooltipTop + 'px';
//     tooltip.textContent = `SpO2: ${clickedData.sp02}, Heartbeat: ${clickedData.heartbeat}`;
//    // updateHeartAndO2(clickedData.sp02, clickedData.heartbeat);
//   } else {
//     document.getElementById('tooltip').style.display = 'none';
//   }
// }
// const myDiv = document.getElementById("myDiv");
// myDiv.addEventListener("click", function() {
//   myDiv.classList.toggle("clicked");
// });

