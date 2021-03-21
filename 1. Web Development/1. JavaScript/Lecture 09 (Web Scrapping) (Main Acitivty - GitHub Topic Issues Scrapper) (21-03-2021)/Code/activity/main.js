const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");

console.log("Before");

request(url, function(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractTopicNames(url, html);
    }
    })

function extractTopicNames(url, html){
    let selTool = cheerio.load(html);
    let allTopics = selTool(".col-12.col-sm-6.col-md-4.mb-4");
    // console.log(allTopics.length);
    let topicNamesArray = [];

    for(let i=0; i<allTopics.length; i++){
        let currentTopicData = selTool(allTopics[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
        let currentTopicName = selTool(currentTopicData).text().trim();

        topicNamesArray.push(currentTopicName);
    }

    // console.log(topicNamesArray);
    extractHtmlHelper(url, topicNamesArray)

}

function extractHtmlHelper(url, topicNamesArray) {
    request(url, function(error, response, html){
        if (error) {
            console.log(error);
        } else {
            // console.log(html);
            extractHtml(html, topicNamesArray);
        }
    })
}

// topic names and their resp. links
function extractHtml(html, topicNamesArray){

    // console.log(topicNamesArray);

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

        navigateToTopicHelper(currentTopicName, fullLink, topicNamesArray);
    }
}

function navigateToTopicHelper(topicName, fullLink, topicNamesArray){
    request(fullLink, function(error, response, html){
        if(error){
            console.log(error);
        }
        else{
            navigateToTopic(topicName, html, topicNamesArray);
        }
    })
}

function navigateToTopic(html, topicName, topicNamesArray){
    let selTool = cheerio.load(html);
    let allRepo = selTool(".d-flex.flex-justify-between.my-3");

    // console.log(allRepo.length);

    for(let i=0; i<9; i++){
        let repoLink = selTool(allRepo[i]).find(".text-bold").attr("href");
        // console.log("https://github.com" + repoLink);
        let fullRepoLink = "https://github.com" + repoLink;
        
        navigateToRepoHelper(topicName, fullRepoLink, topicNamesArray);
    }
    // console.log();
}

function navigateToRepoHelper(topicName, fullRepoLink, topicNamesArray){
    request(fullRepoLink, function(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            navigateToRepo(topicName, html, topicNamesArray);
        }
    })
}

function navigateToRepo(html, topicName, topicNamesArray){
    let selTool = cheerio.load(html);
    
    let allfuncIncludingIssues = selTool(".UnderlineNav-body.list-style-none .d-flex");
    let issueLink = selTool(allfuncIncludingIssues[1]).find("a").attr("href").trim();
    let fullIssueLink = "https://github.com" + issueLink;

    console.log(fullIssueLink);
    // console.log(topicName + ": " + fullIssueLink);

    // navigateToIssueHelper(fullIssueLink, topicName, topicNamesArray);
}

function navigateToIssueHelper(fullIssueLink, topicName, topicNamesArray){
    request(fullIssueLink, function(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            navigateToIssue(html, topicName, topicNamesArray);
        }
    })
}

function navigateToIssue(html, topicName, topicNamesArray){
    let selTool = cheerio.load(html);

    let allIssues = selTool(".Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row");
    // console.log(allIssues.length);

}


console.log("After");