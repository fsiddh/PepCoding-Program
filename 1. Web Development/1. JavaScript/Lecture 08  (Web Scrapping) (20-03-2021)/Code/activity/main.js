const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");

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
        let fullLink = "https://github.com" + currentTopicLink;

        // console.log(currentTopicName);
        // console.log(fullLink);
        // console.log();

        navigateToRepoHelper(currentTopicName, fullLink);
    }
}

function navigateToRepoHelper(topic, fullLink){
    request(fullLink, function(error, response, html){
        if(error){
            console.log(error);
        }
        else{
            navigateToRepo(topic, html);
        }
    })
}

function navigateToRepo(topic, html){
    let selTool = cheerio.load(html);
    let allRepo = selTool(".d-flex.flex-justify-between.my-3");

    // console.log(allRepo.length);

    for(let i=0; i<9; i++){
        let repoLink = selTool(allRepo[i]).find(".text-bold").attr("href");
        console.log("https://github.com" + repoLink);
    }
    console.log();
}



console.log("After");