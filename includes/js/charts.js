//bars
const ctx = document.getElementById("barChart").getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
    labels: [
      "First",
      "Second",
      "Third"
    ],
    datasets: [{
      data: [300, 50, 100],
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