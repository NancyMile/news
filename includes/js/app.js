$(document).ready(function () {
  $('#spinner-div').hide();
  $("#get-news").click(function () {
    $('#spinner-div').show();
  })
})

async function sendData() {
  try {
    const urlList = [];
    const trends = [];

    const response = await fetch(
      "http://localhost:8080/news.php"
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.text()
      .then(function (data) {
        // This is the JSON from our response
        html = data
        /////
        //alert('devolvio html')
        //const urlList = [];
        //const trends = [];
        //trends
        const trendHTMLElements = $(html).find('a');
        //const trends = [];
        trendHTMLElements.each((i, trendHTML) => {
          // scrape data from the link HTML element
          trendTopics = $(trendHTML).data('tgevContainer')
          //list of links
          const links = {
              linkName: $(trendHTML).text(),
              linkUrl: $(trendHTML).attr("href")
          }
          //marked as trending
          if (trendTopics === 'trending-topics') {
            // scrape data from the article HTML element
            const trend = {
              trendName: $(trendHTML).text(),
              trendUrl: $(trendHTML).attr("href")
            };
            trends.push(trend);
          }
          urlList.push(links)
        });
        //alert('tosooooo links')
        //alert(urlList)

        this.trends = trends

        console.log(data);
        console.log(trends);
      })
      //get data from pages
      .then(async function () {
        //alert("aquiiiiii---- "+JSON.stringify(this.trends))
        ///todos los links
        articles = [];
        wordCounts = [];
        highPerpage = [];
        keywordsPages = [];
        totalString = '';
        let  objUrlList= JSON.parse(JSON.stringify(this.trends)); //this was urlList  //trends
        //alert("total links "+objUrlList.length) //722 links
        for (const x in objUrlList) {
          //let urlLink = objUrlList[x].trendUrl;  /trendUrl /linkUrl
          let urlLink = objUrlList[x].trendUrl;
          if (!urlLink.startsWith("http")) {
            //alert("url"+urlLink)
            //send page url
            const pages = await fetch('pages.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              body: "url=https://news.com.au/"+urlLink
            })
              .then(response => response.text())
              .then(function (data) {
                // This is the JSON from our response
                html_pages = data
                //////en la pg
                let string = '';
                // retrieve list of news by article
                let articleHTMLElements = $(html_pages).find("article");
                // news with the scraped data
                articleHTMLElements.each((i, articleHTML) => {
                  //string to get the most repeated words
                  let paragraph = $(articleHTML).find("p").text();
                  string = string + '' + $(articleHTML).find("h4").text() + '' + paragraph;
                    if (paragraph !=='') {
                      // scrape data from the article HTML element
                      const article = {
                        headLine: $(articleHTML).find("h4").text(),
                        articleSummary: $(articleHTML).find("p").text(),
                        url: $(articleHTML).find("a").attr("href"),
                        image: $(articleHTML).find("img").attr("src"),
                      };
                      articles.push(article);
                    }
                });
                // getting keywords
                if (string !== '') {
                  totalString = totalString + '' + string;
                  wordCountsPage = nthMostCommon(string, 15);
                  highPerpage.push(wordCountsPage[0]);
                  wordCounts.push(wordCountsPage);
                }
                /////
                console.log(data);
              })
              .then(function (html) {
                // Convert the HTML string into a document object
                //var document = parser.parseFromString(html, 'text/html');
                //console.log(html);
              })
              .catch(function (error) {
                // There was an error
                console.warn('Something went wrong.', error);
              });
          }
        }//for
        //calculating all the key words from all pages
        keywordsPages = nthMostCommon(totalString, 15);

        // console.log("LAST WORD COUNTS pages-------");
        // console.log(keywordsPages)

        // console.log("LAST WORD COUNTS sumary each page-----");
        // console.log(wordCounts)

        //alert("after for"+JSON.stringify(articles))
        //return { articles, wordCounts };

        return  $.post({
          url: 'http://localhost:8080/index.php',
          data: { "data": articles,"keywordsPages": keywordsPages, "trends":trends, "highPerpage": highPerpage },
          success: function (articles) {
            $("body").html(articles);
          },
          complete: function () {
            $("#spinner-div").hide();
          }
        });
      })
    } catch (error) {
      console.error(`Could not get data: ${error}`);
    }
}


/* source https://stackoverflow.com/questions/53874692/how-do-i-solve-most-frequent-word-in-sentence-according-to-these-hints-in-python*/

function nthMostCommon(str, amount) {
  const stickyWords = ignoreWords;
    str= str.toLowerCase();
    var splitUp = str.split(/\s/);
    const wordsArray = splitUp.filter(function(x){
    return !stickyWords.includes(x) ;
            });
    var wordOccurrences = {}
    for (var i = 0; i < wordsArray.length; i++) {
        wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
    }
    var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
        /* you may want to include a binary search here */
        for (var i = 0; i < amount; i++) {
            if (!acc[i]) {
                acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                break;
            } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                if (acc.length > amount)
                    acc.pop();
                break;
            }
        }
        return acc;
    }, []);

    return result;
}

function generatePie(){
  //key words
  //alert(keywordsPages)
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
}

function generateBarChart() {
  const objTrends = JSON.parse(JSON.stringify(keywordsPages));
  let barChartLabels = [];
  let barChartDetails = [];
  let barChartBgColor = [];
  let barChartBorderColor = [];

  const randomRgbColor = (opacy) => {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    let o = opacy;
    return 'rgb(' + r + ',' + g + ',' + b + ',' + o +')';
  };

  for (const x in objTrends) {
    barChartLabels.push(objTrends[x].word);
    barChartDetails.push(objTrends[x].occurences);
    //barChartDetails.push(Math.floor(Math.random(1-99)));
    //generate ramdom colors
    barChartBgColor.push(randomRgbColor(0.2));
    barChartBorderColor.push(randomRgbColor(1));
  }

  //bars
  const ctx = document.getElementById("barChart").getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barChartLabels,
      datasets: [{
        label: '',
        data: barChartDetails,
        backgroundColor: barChartBgColor,
        borderColor: barChartBorderColor,
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
}


function generateTrendsChart() {
  const objTrends = JSON.parse(JSON.stringify(highPerpage));
  let barChartLabels = [];
  let barChartDetails = [];
  let barChartBgColor = [];
  let barChartBorderColor = [];

  const randomRgbColor = (opacy) => {
    let r = Math.floor(Math.random() * 256); // Random between 0-255
    let g = Math.floor(Math.random() * 256); // Random between 0-255
    let b = Math.floor(Math.random() * 256); // Random between 0-255
    let o = opacy;
    return 'rgb(' + r + ',' + g + ',' + b + ',' + o +')';
  };

  for (const x in objTrends) {
    barChartLabels.push(objTrends[x].word);
    barChartDetails.push(objTrends[x].occurences);
    //barChartDetails.push(Math.floor(Math.random(1-99)));
    //generate ramdom colors
    barChartBgColor.push(randomRgbColor(0.2));
    barChartBorderColor.push(randomRgbColor(1));
  }

  //bars
  const ctx = document.getElementById("trendsChart").getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barChartLabels,
      datasets: [{
        label: '',
        data: barChartDetails,
        backgroundColor: barChartBgColor,
        borderColor: barChartBorderColor,
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
}