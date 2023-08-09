const objWordCounts = JSON.parse(JSON.stringify(wordCounts));

let chartLabels = [];
let chartDetails = [];

for (const x in objWordCounts) {
  chartLabels.push(objWordCounts[x].word);
  chartDetails.push(objWordCounts[x].occurences);
}

//bars
const ctx = document.getElementById("barChart").getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '',
        data: chartDetails,
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
    labels: chartLabels,
    datasets: [{
      data: chartDetails,
      borderWidth: 7,
      backgroundColor: [
        '#46d8d5',
        "#182390",
        "#f5e132",
      ],
      hoverBackgroundColor: [
        '#46d8d5',
        "#182390",
        "#f5e132",
      ]
    }]
  }
});