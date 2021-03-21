const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");

console.log("Before");

request(url, cb); // requests for whole html content of "url"
function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractHtml(html);
    }
}

// extracting topic names and their resp. links
function extractHtml(html){
    let selTool = cheerio.load(html);
    let allTopics = selTool(".col-12.col-sm-6.col-md-4.mb-4"); // extarcts all 3 topics
    // console.log(allTopics.length);

    // One by one looping through each topic and then extracting it's name and it's link from "a" tag.
    for(let i=0; i<allTopics.length; i++){ 
        let currentTopicData = selTool(allTopics[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1"); // apn ne find use isliye kara kyoki apnko koi specific data chahie tha "allTopics" ke andr se! 
        let currentTopicName = selTool(currentTopicData).text().trim(); // removes extra space from start and end.

        let currentTopicLink = selTool(allTopics[i]).find(".no-underline.d-flex.flex-column.flex-justify-center").attr("href");
        let fullLink = "https://github.com" + currentTopicLink;

        // console.log(currentTopicName);
        // console.log(fullLink);
        // console.log();

        navigateToRepoHelper(currentTopicName, fullLink);
    }
}

// Extracts whole html data of "allTopics[i]"th Topic
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

// Extracts link of top 8 repos of "allTopics[i]"th Topic
function navigateToRepo(topic, html){
    let selTool = cheerio.load(html);
    let allRepo = selTool(".d-flex.flex-justify-between.my-3"); // Extracts all repos

    // console.log(allRepo.length);

    // finds top 8 repo links
    for(let i=0; i<9; i++){
        let repoLink = selTool(allRepo[i]).find(".text-bold").attr("href");
        console.log("https://github.com" + repoLink);
    }
    console.log();
}



console.log("After");