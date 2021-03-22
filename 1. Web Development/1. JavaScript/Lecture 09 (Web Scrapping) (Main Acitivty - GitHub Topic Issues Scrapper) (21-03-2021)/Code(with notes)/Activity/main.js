let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let pdfDocument = require("pdfkit"); //module for creating pdf

//creating folder of TOPIC
function dirCreator(topicName){
    let pathOfFolder = path.join(__dirname, topicName);
    if(fs.existsSync(topicName) == false){
        fs.mkdirSync(pathOfFolder);
    }
}

//creating .json files of repositories
function fileCreator( repoName,topicName){
    let filePath = path.join(__dirname, topicName, repoName + ".json");
    if(fs.existsSync(filePath) == false){ //method of creating file
        let file = fs.createWriteStream(filePath); 
        file.end();
    }
}

//all issues name and link of a particular repo
function extractRepoIssues(html,topicName,repoName){
    let selectorTool = cheerio.load(html);
    let issues = selectorTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"); // Extracted all Issues anchor tags
    let issueObj = []; // To store objects of each Issue eg-> [{"Name":issueName, "Link":issueLink}, {...}, {...}, {...}]

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

//issue page link via its repolink html
function extractIssue(html,topicName,repoName){ // page -> github.com/topics/topicName/repoName
    let selectorTool = cheerio.load(html);

    let allLinks = selectorTool(".UnderlineNav-body.list-style-none .d-flex");
    let issueLink = selectorTool(allLinks[1]).find("a"); // 2nd tab -> issue anchor tag
    issueLink = "https://github.com" + selectorTool(issueLink).attr("href"); // full link to issue page

    getallIssues(issueLink,topicName,repoName);
    // console.log(issueLink," : ",topicName);
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

//8 repo links for each topic html
function extractRepoLink(html){ // page -> github.com/topics/topicName
    let selectorTool = cheerio.load(html);
    let topicName = selectorTool(".h1-mktg").text().trim();  //Extacted Topic name & trimmed it because it had many spaces

    // console.log(topicName);

    dirCreator(topicName); //creating folder named based on "topicName"

    let allRepos = selectorTool(".border.rounded.color-shadow-small.color-bg-secondary.my-4"); 

    for(let i=0;i<8;i++){
        let allATag = selectorTool(allRepos[i]).find("a");   // got anchortags 
        let repositoryLink = selectorTool(allATag[1]).attr("href");   // selected 2nd anchor tag (repo link)
        let repoName = repositoryLink.split("/").pop();  // eg -> kc0112/Algorithms (repoLink)  ->  Algorithms (repoName)
        repoName = repoName.trim(); // removed spaces

        fileCreator(repoName, topicName); // create file on path "./topicName/repoName.json"

        repositoryLink = "https://github.com" + repositoryLink; // full link
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

// Extracts 3 topic links via github.com/topics html
function extractTopicLink(html){ // page -> github.com/topics
    let selectorTool = cheerio.load(html);
    let topics= selectorTool(".col-12.col-sm-6.col-md-4.mb-4 a");
    for(let i=0; i<topics.length; i++){
        let topiclink = "https://github.com" + selectorTool(topics[i]).attr("href");   // got topic link page
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


