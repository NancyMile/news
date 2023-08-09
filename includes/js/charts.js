const objWordCounts = JSON.parse(JSON.stringify(wordCounts));

let pieChartLabels = [];
let pieChartDetails = [];
let pieChartBgColor = [];

for (const x in objWordCounts) {
  pieChartLabels.push(objWordCounts[x].word);
  pieChartDetails.push(objWordCounts[x].occurences);
  //generate ramdom colors
  pieChartBgColor.push("#"+(Math.floor(Math.random()*16777215).toString(16)));
}

//bars
const ctx = document.getElementById("barChart").getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pieChartLabels,
      datasets: [{
        label: '',
        data: pieChartDetails,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


  //pie
var ctx3 = document.getElementById("pieChart");
var pieChart3 = new Chart(ctx3, {
  type: 'pie',
  options: {
    legend: {
      position: 'left',
      labels: {
        boxWidth: 10,
        fontStyle: 'italic',
        fontColor: '#aaa',
        usePointStyle: true,
      }
    },
  },
  data: {
    labels: pieChartLabels,
    datasets: [{
      data: pieChartDetails,
      borderWidth: 7,
      backgroundColor: pieChartBgColor,
      hoverBackgroundColor: pieChartBgColor
    }]
  }
});