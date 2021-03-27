let puppeteer = require("puppeteer");
let { email, password } = require("../secrets"); // imported email & paswrd
let global_tab; // to keep info of TAB we'll work on

console.log("before");


// Launched Browser
let browserPromise = puppeteer.launch({
	headless: false, // ":false" s Automation hote hue dikhta hai
});

browserPromise
	.then(function (browserReference) {
		// after launch -> we'll get browser's refrnce
		let newTab_Promise = browserReference.newPage(); // ".newPage()"(returns promise) for opening new TAB
		return newTab_Promise; // Necessary to return for Chained Promises!
	})
	.then(function (newTabReference) {
		global_tab = newTabReference;

		let loginPageWillBeOpened_Promise = newTabReference.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"
		);
		return loginPageWillBeOpened_Promise;
	})
	.then(function () {
		console.log("Login Page Opened");

		// type -> Types into a selector that identifies a form element
		let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {
			delay: 100,
		}); // type(tag, email id , delay rate for typing)
		return emailWillBeTyped_Promise;
	})
	.then(function () {
		console.log("email Entered!");

		let passwordWillBeType_Promise = global_tab.type("#input-2", password, {
			delay: 100,
		});
		return passwordWillBeType_Promise;
	})
	.then(function () {
		console.log("password Entered");

		// Perform a mouse click event on the element passed as parameter
		let loginButton_Promise = Promise.all([
			global_tab.waitForNavigation(),
			global_tab.click(
				".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
			),
		]);

		return loginButton_Promise;
	})
	.then(function () {
		console.log("logged in");

		let preparationKit_Promise = Promise.all([
			global_tab.waitForNavigation(),
			global_tab.click(
				".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled"
			),
		]);
		return preparationKit_Promise;
	})
	.then(function () {
		console.log("Interview Page");

		let warmupPageWillBeOpened_Promise = Promise.all([
			global_tab.waitForNavigation(),
			global_tab.click(
				".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled"
			),
		]);

		return warmupPageWillBeOpened_Promise;
	})
	.then(function () {
		console.log("warmup page");

		let salesPageWillBeOpened_Promise = setTimeout(function () {
			Promise.all([
				global_tab.waitForNavigation(),
				global_tab.click(
					".recommended-challenge.pjB .js-track-click.challenge-list-item"
				),
			]);
		}, 2000);

		return salesPageWillBeOpened_Promise;
	})
	.then(function () {
		console.log("sales page");

		let editorialWillBeOpened_Promise = setTimeout(function () {
			Promise.all([
				global_tab.waitForNavigation(),
				global_tab.click("#tab-1-item-4"),
			]);
		}, 3000);

		return editorialWillBeOpened_Promise;
	})
	.then(function () {
		console.log("Entered Editorial");
	})
	.catch(function (err) {
		console.log(err);
	});

console.log("after");
