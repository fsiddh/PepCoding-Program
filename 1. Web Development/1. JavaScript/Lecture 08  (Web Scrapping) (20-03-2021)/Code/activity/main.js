let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");

console.log("Before");

request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractHtml(html);
    }
}

// topic names and their resp. links
function extractHtml(html){
    let selTool = cheerio.load(html);
    let allTopics = selTool(".col-12.col-sm-6.col-md-4.mb-4");
    // console.log(allTopics.length);

    for(let i=0; i<allTopics.length; i++){
        let currentTopicData = selTool(allTopics[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
        let currentTopicName = selTool(currentTopicData).text().trim();

        let currentTopicLink = selTool(allTopics[i]).find(".no-underline.d-flex.flex-column.flex-justify-center").attr("href");
        let fullLink = "https://github.com" + currentTopicLink

        console.log(currentTopicName);
        console.log(fullLink);
        console.log();
    }
}