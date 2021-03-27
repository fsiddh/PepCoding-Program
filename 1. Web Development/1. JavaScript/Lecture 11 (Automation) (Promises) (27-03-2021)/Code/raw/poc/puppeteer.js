let puppeteer = require("puppeteer");

// To launch Browser
let browserWillBeLaunchedPromise = puppeteer.launch({ 
    headless: false
})

// Jab browser launch ho jaega tab .then will execute
// it's function and pass launched browser's refernce 
browserWillBeLaunchedPromise
    .then(function(browserInstance){
        let newPagePromise = browserInstance.newPage(); // for new tab
        
        newPagePromise
            .then(function(newPage){
                console.log("New Tab Opened");

                let pageWillBeOpenedPromise = newPage.goto("https://www.pepcoding.com");
                pageWillBeOpenedPromise
                    .then(function(){
                        console.log("Page is Opened");
                    })
            })
    })