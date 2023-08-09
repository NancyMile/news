

function sendData() {
  $.get("http://localhost:8080/news.php", function (html) {
    // retrieve list of news by article
    const articleHTMLElements = $(html).find("article");

    const articles = [];
    // news with the scraped data
    articleHTMLElements.each((i, articleHTML) => {
      // scrape data from the article HTML element
      const article = {
        headLine: $(articleHTML).find("h4").text(),
        articleSummary: $(articleHTML).find("p").text(),
        url: $(articleHTML).find("a").attr("href"),
        image: $(articleHTML).find("img").attr("src"),
      };
      articles.push(article);
    });

    console.log(JSON.stringify(articles));
    return  $.post({
      url: 'http://localhost:8080/index.php',
      data:{"data":articles},
      success: function (articles) {
        $("body").html(articles);
      }
    });
  });
}