const url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfKit = require("pdfkit");

console.log("Before");

function createDir(topicName){
    let folder_path = path.join(__dirname, topicName);

    if(fs.existsSync(folder_path) == false){
        fs.mkdirSync(folder_path);
    }
}

function createFile(topicName, repoName){
    let file_path = path.join(__dirname, topicName, repoName + ".json");

    if(fs.existsSync(file_path) == false){
        let file = fs.createWriteStream(file_path);
        file.end();
    }
}

request(url, function(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractHtml(html);
    }
})

// topic names and their resp. links
function extractHtml(html){
    // console.log(topicNamesArray);

    let selTool = cheerio.load(html);
    let allTopics = selTool(".col-12.col-sm-6.col-md-4.mb-4");
    // console.log(allTopics.length);

    for(let i=0; i<allTopics.length; i++){
        let currentTopicData = selTool(allTopics[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
        let currentTopicName = selTool(currentTopicData).text().trim();

        createDir(currentTopicName);

        let currentTopicLink = selTool(allTopics[i]).find(".no-underline.d-flex.flex-column.flex-justify-center").attr("href");
        let fullLink = "https://github.com" + currentTopicLink;

        // console.log(currentTopicName);
        // console.log(fullLink);
        // console.log();

        navigateToTopicHelper(currentTopicName, fullLink);
    }
}

function navigateToTopicHelper(topicName, fullLink){
    request(fullLink, function(error, response, html){
        if(error){
            console.log(error);
        }
        else{
            navigateToTopic(html, topicName);
        }
    })
}

function navigateToTopic(html, topicName){
    let selTool = cheerio.load(html);
    let allRepo = selTool(".d-flex.flex-justify-between.my-3");

    // console.log(allRepo.length);

    for(let i=0; i<8; i++){
        let repoLink = selTool(allRepo[i]).find(".text-bold").attr("href");
        let repoName = repoLink.split("/").pop();

        createFile(topicName, repoName);

        // console.log(repoName);
        // console.log(repoLink);
        // console.log("https://github.com" + repoLink);

        let fullRepoLink = "https://github.com" + repoLink;
        
        navigateToRepoHelper(topicName, repoName, fullRepoLink);
    }
    // console.log();
}

function navigateToRepoHelper(topicName, repoName, fullRepoLink){
    request(fullRepoLink, function(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            navigateToRepo(html, topicName, repoName);
        }
    })
}

function navigateToRepo(html, topicName, repoName){
    let selTool = cheerio.load(html);
    
    // let repoName = selTool("mr-2 flex-self-stretch a").text();
    // console.log(repoName);

    let allfuncIncludingIssues = selTool(".UnderlineNav-body.list-style-none .d-flex");
    let issueLink = selTool(allfuncIncludingIssues[1]).find("a").attr("href").trim();
    let fullIssueLink = "https://github.com" + issueLink;

    // console.log(issueLink);
    // console.log(fullIssueLink);
    // console.log(topicName + ": " + fullIssueLink);

    navigateToIssueHelper(fullIssueLink, topicName, repoName);
}

function navigateToIssueHelper(fullIssueLink, topicName, repoName){
    request(fullIssueLink, function(err, response, html){
        if(err){
            console.log(err);
        }
        else{
            navigateToIssue(html, topicName, repoName);
        }
    })
}

function navigateToIssue(html, topicName, repoName){
    let selTool = cheerio.load(html);

    let allIssues = selTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    // console.log(allIssues.length);

    let issueArr = [];

    for(let i=0; i<allIssues.length; i++){
        let issueName = selTool(allIssues[i]).text();
        let issueLink = selTool(allIssues[i]).attr("href");
        let fullIssueLink = "https://github.com" + issueLink;

        // console.log("Topic:" + topicName);
        // console.log("IssueName: " + issueName);
        // console.log("IssueLink: " + fullIssueLink);
        // console.log();
        
        let issueObj = {
            "Topic": topicName,
            "Repository Name": repoName,
            "Name": issueName,
            "Link": fullIssueLink
        };

        issueArr.push(issueObj);
    }

    // ========================= JSON CREATION ==========================
    // let file_path = path.join(__dirname, topicName, repoName + ".json");
    // fs.writeFileSync(file_path, JSON.stringify(issueArr));
    
    // ========================= PDF CREATION ==========================
    let file_path = path.join(__dirname, topicName, repoName + ".pdf");
    let pdf_doc = new pdfKit;
    pdf_doc.pipe(fs.createWriteStream(file_path));
    pdf_doc.text(JSON.stringify(issueArr));
    pdf_doc.end();

    // console.log("---------------------------------------------");
    // console.table(issueArr);
    // return issueArr;

}


console.log("After");