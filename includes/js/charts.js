
  //key words
alert(keywordsPages)

  const objWordCounts = JSON.parse(JSON.stringify(keywordsPages));
  let pieChartLabels = [];
  let pieChartDetails = [];
  let pieChartBgColor = [];

  for (const x in objWordCounts) {
    pieChartLabels.push(objWordCounts[x].word);
    pieChartDetails.push(objWordCounts[x].occurences);
    //generate ramdom colors
    pieChartBgColor.push("#"+(Math.floor(Math.random()*16777215).toString(16)));
  }

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



// //trends
// const objTrends = JSON.parse(JSON.stringify(trends));
// let barChartLabels = [];
// let barChartDetails = [];
// let barChartBgColor = [];
// let barChartBorderColor = [];

// const randomRgbColor = (opacy) => {
//   let r = Math.floor(Math.random() * 256); // Random between 0-255
//   let g = Math.floor(Math.random() * 256); // Random between 0-255
//   let b = Math.floor(Math.random() * 256); // Random between 0-255
//   let o = opacy;
//   return 'rgb(' + r + ',' + g + ',' + b + ',' + o +')';
// };

// for (const x in objTrends) {
//   barChartLabels.push(objTrends[x].trendName);
//  // barChartDetails.push(objTrends[x].occurences);
//  barChartDetails.push(Math.floor(Math.random(1-99)));
//   //generate ramdom colors
//   barChartBgColor.push(randomRgbColor(0.2));
//   barChartBorderColor.push(randomRgbColor(1));
// }

// //bars
// const ctx = document.getElementById("barChart").getContext('2d');
//   let myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: barChartLabels,
//       datasets: [{
//         label: '',
//         data: pieChartDetails,
//         backgroundColor: barChartBgColor,
//         borderColor: barChartBorderColor,
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
