let puppeteer = require("puppeteer");
let {email, password} = require("../../secrets");
let global_tab;

console.log("before");

let browserPromise = puppeteer.launch({
    headless: false
})

browserPromise
    .then(function(browserReference){
        let newTabPromise = browserReference.newPage();
        return newTabPromise;
    }).then(function(newTabReference){
        global_tab = newTabReference;
        
        let loginPageWillBeOpenedPromise = newTabReference.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        return loginPageWillBeOpenedPromise;
    }).then(function(){
        console.log("Login Page Opened");

        let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {delay: 200});
        return emailWillBeTyped_Promise;
    }).then(function(){
        console.log("email Entered!");

        let passwordWillBeType_Promise = global_tab.type("#input-2", password, {delay: 200});
        return passwordWillBeType_Promise;
    }).then(function(){
        console.log("password Entered");

        let loginButtonWillBeClicked_Promise = global_tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return loginButtonWillBeClicked_Promise;
    }).then(function(){
        console.log("Login Completed");
    }).catch(function(err){
        console.log(err);
    })

console.log("after");