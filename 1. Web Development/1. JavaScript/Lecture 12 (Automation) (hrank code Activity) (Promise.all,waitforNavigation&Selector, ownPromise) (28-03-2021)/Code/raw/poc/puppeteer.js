let puppeteer = require("puppeteer");


let browserWillBeLaunchedPromise = puppeteer.launch({ 
    headless: false
})


browserWillBeLaunchedPromise
    .then(function(browserInstance){
        let newPagePromise = browserInstance.newPage()
        
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