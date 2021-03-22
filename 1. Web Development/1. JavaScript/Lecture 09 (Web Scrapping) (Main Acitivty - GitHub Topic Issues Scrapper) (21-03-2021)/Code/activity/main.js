let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdfDocument = require("pdfkit");


function dirCreator(topicName){
    let pathOfFolder = path.join(__dirname, topicName);
    if(fs.existsSync(topicName) == false){
        fs.mkdirSync(pathOfFolder);
    }
}

function fileCreator( repoName,topicName){
    let filePath = path.join(__dirname, topicName, repoName + ".json");
    if(fs.existsSync(filePath) == false){
        let file = fs.createWriteStream(filePath); 
        file.end();
    }
}

function extractRepoIssues(html,topicName,repoName){
    let selectorTool = cheerio.load(html);
    let issues = selectorTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let issueObj = [];

    for(let i=0;i<issues.length;i++){
        let issueName = selectorTool(issues[i]).text();
        let issueLink = "https://github.com" + selectorTool(issues[i]).attr("href");
        // console.log(topicName+":"+issueName+":"+issueLink);

        let obj = {
            "Name" : issueName,
            "Link" : issueLink,
        }
        issueObj.push(obj);
    }
    // console.log(topicName);
    // console.table(issueObj);
    // console.log("========================");

    // ==========================================JSON Creation=============================================================
    let file_path = path.join(__dirname, topicName, repoName + ".json");
    fs.writeFileSync(file_path, JSON.stringify(issueObj));


    //==========================================PDF CREATION===============================================================
    // let filePath = path.join(__dirname,topicName,repoName+".pdf");
    // let pdfDoc = new pdfDocument;
    // pdfDoc.pipe(fs.createWriteStream(filePath));
    // pdfDoc.text(JSON.stringify(issueObj));
    // pdfDoc.end();
}

function getallIssues(issueLink,topicName,repoName){
    request(issueLink, function(error,response,html){
        if(error){
            // if(response.status== 404){
            //     console.log("No issue page found");
            // }
            // else{
            console.log(error);
            //}
        }
        else{
            extractRepoIssues(html,topicName,repoName);
        }
    });
}

function extractIssue(html,topicName,repoName){
    let selectorTool = cheerio.load(html);

    let allLinks = selectorTool(".UnderlineNav-body.list-style-none .d-flex");
    let issueLink = selectorTool(allLinks[1]).find("a");
    issueLink = "https://github.com" + selectorTool(issueLink).attr("href");

    getallIssues(issueLink,topicName,repoName);
}

function getIssue(repositoryLink,topicName,repoName){
    request(repositoryLink, function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
            extractIssue(html,topicName,repoName);
        }
    });
}


function extractRepoLink(html){
    let selectorTool = cheerio.load(html);
    let topicName = selectorTool(".h1-mktg").text().trim();

    // console.log(topicName);

    dirCreator(topicName);

    let allRepos = selectorTool(".border.rounded.color-shadow-small.color-bg-secondary.my-4"); 

    for(let i=0;i<8;i++){
        let allATag = selectorTool(allRepos[i]).find("a");
        let repositoryLink = selectorTool(allATag[1]).attr("href");
        let repoName = repositoryLink.split("/").pop();
        repoName = repoName.trim();

        fileCreator(repoName, topicName);

        repositoryLink = "https://github.com" + repositoryLink;
        getIssue(repositoryLink,topicName,repoName); 
    }
}

function getRepoHelper(link){
    request(link,cb);
    function cb(error,response,html){
        if(error){
            console.log(error);
        }else{
            extractRepoLink(html); 
        }
    }
}

function extractTopicLink(html){
    let selectorTool = cheerio.load(html);
    let topics= selectorTool(".col-12.col-sm-6.col-md-4.mb-4 a");
    for(let i=0; i<topics.length; i++){
        let topiclink = "https://github.com" + selectorTool(topics[i]).attr("href");
        getRepoHelper(topiclink);
    }
}

request(url,callback); // callback is a function passed into another function as an argument to be executed later
function callback(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractTopicLink(html) ;
    }
}


