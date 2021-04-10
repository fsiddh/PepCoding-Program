let puppeteer = require("puppeteer");

// To launch Browser
let browserWillBeLaunchedPromise = puppeteer.launch({
	headless: false,
});

// Chaining Implemented
browserWillBeLaunchedPromise
	.then(function (browserInstance) {
		// new tab
		let newPagePromise = browserInstance.newPage();
		return newPagePromise;
	})
	.then(function (newPage) {
		console.log("new tab opened");
		// go to pepcoding
		let pageWillBeopenedPromise = newPage.goto("https://www.pepcoding.com");
		return pageWillBeopenedPromise;
	})
	.then(function () {
		console.log("page is opened");
	})
	.catch(function (err) {
		console.log(err);
	});
