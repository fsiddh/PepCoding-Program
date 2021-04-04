const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets"); // imported email & paswrd

let global_tab; // to keep info of TAB we'll work on,
// acc. to node naming convetion TABs are opften referred as PAGEs

console.log("before");

// Launched Browser
let browserPromise = puppeteer.launch({
	headless: false, // ":false" s Automation hote hue dikhta hai
	// defaultViewport: null,
	// args: ["--start-maximized", "--incognito"], // "--start.." -> max Window Size, "--icog..." -> Automates in icog. mode
});

browserPromise
	.then(function (browserReference) {
		// after launch -> we'll get browser's refrnce
		let newTab_Promise = browserReference.newPage(); // ".newPage()"(returns promise) for opening new TAB
		return newTab_Promise; // Necessary to return for Chained Promises!
	})
	.then(function (newTabReference) {
		global_tab = newTabReference; //stores ref of newly created tab

		let loginPageWillBeOpened_Promise = global_tab.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login" //navigate to login page
		);
		return loginPageWillBeOpened_Promise;
	})
	.then(function () {
		console.log("Login Page Opened");

		// type -> Types into a selector that identifies a form element
		let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {
			delay: 50,
		}); // type(tag, email id , delay rate for typing)
		return emailWillBeTyped_Promise;
	})
	.then(function () {
		console.log("email Entered!");

		let passwordWillBeType_Promise = global_tab.type("#input-2", password, {
			delay: 50,
		});
		return passwordWillBeType_Promise;
	})
	.then(function () {
		console.log("password Entered");

		let loginButtonWillBeClicked_Promise = global_tab.click(
			".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
		);

		return loginButtonWillBeClicked_Promise;
	})
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		let wait_click_pkit = waitAndClick(
			".card-content h3[title='Interview Preparation Kit']"
		);
		return wait_click_pkit;
	})
	.then(function () {
		console.log("Interview Preparation Kit page Opened.");

		let wait_click_warmup = waitAndClick("a[data-attr1='warmup']");
		return wait_click_warmup;
	})
	.then(function () {
		console.log("Warm Up page Opened!");
	})
	.catch(function (err) {
		console.log(err);
	});

function waitAndClick(selector) {
	return new Promise(function (resolve, reject) {
		let selectorWaitPromise = global_tab.waitForSelector(selector, {
			visible: true,
		});
		selectorWaitPromise.then(function () {
			let selectorClickPromise = global_tab.click(selector);
			selectorClickPromise
				.then(function () {
					resolve();
				})
				.catch(function () {
					reject(err);
				});
		});
	});
}
