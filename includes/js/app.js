let wordCounts = {};
const trends = [];

function sendData() {
  $.get("http://localhost:8080/news.php", function (html) {
    //trends
    const trendHTMLElements = $(html).find('a');
    trendHTMLElements.each((i, trendHTML) => {
      // scrape data from the link HTML element
      trendTopics =$(trendHTML).data('tgevContainer')
      if (trendTopics === 'trending-topics') {
        const trend = {
          trendName: $(trendHTML).text()
        };
        trends.push(trend);
        }
    });
    //alert(JSON.stringify(trends));

    // retrieve list of news by article
    const articleHTMLElements = $(html).find("article");
    let string = '';
    const articles = [];
    // news with the scraped data
    articleHTMLElements.each((i, articleHTML) => {
      //string to get the most repeated words
      let paragrath = $(articleHTML).find("p").text();
      string = string+$(articleHTML).find("h4").text()+''+paragrath;

      //check that the news has paragraph
      if (paragrath) {
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
    wordCounts = nthMostCommon(string, 15);

    //articles.push(wordCounts);

    //console.log(JSON.stringify(articles));
    //alert("wordCounts: "+JSON.stringify(wordCounts));

    return  $.post({
      url: 'http://localhost:8080/index.php',
      data: { "data": articles, "wordCounts": wordCounts },
      success: function (articles) {
        $("body").html(articles);
      }
    });
  });
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