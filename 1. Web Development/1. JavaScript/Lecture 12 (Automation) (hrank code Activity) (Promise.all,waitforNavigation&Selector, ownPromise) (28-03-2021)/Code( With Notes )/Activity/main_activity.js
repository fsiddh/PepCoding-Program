const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets"); // imported email & paswrd

let global_tab; // to keep info of TAB we'll work on,
// acc. to node naming convetion TABs are opften referred as PAGEs

console.log("before");

// Launched Browser
let browserPromise = puppeteer.launch({
	headless: false, // ":false" s Automation hote hue dikhta hai
	defaultViewport: null,
	args: ["--start-maximized", "--incognito"], // "--start.." -> max Window Size, "--icog..." -> Automates in icog. mode
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
			delay: 200,
		}); // type(tag, email id , delay rate for typing)
		return emailWillBeTyped_Promise;
	})
	.then(function () {
		console.log("email Entered!");

		let passwordWillBeType_Promise = global_tab.type("#input-2", password, {
			delay: 200,
		});
		return passwordWillBeType_Promise;
	})
	.then(function () {
		console.log("password Entered");

		let loginButtonWillBeClicked_Promise = global_tab.click(
			".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
		); // Perform a mouse click event on the element passed as parameter

		let interviewKitElem_Promise = global_tab.waitForSelector(
			".card-content h3[title='Interview Preparation Kit']",
			{
				visible: true,
			}
		);

		let combined_Promise = Promise.all([
			loginButtonWillBeClicked_Promise,
			global_tab.waitForNavigation({ waitUntil: "networkidle0" }),
			interviewKitElem_Promise,
		]);

		return combined_Promise;
	})
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		let interviewKitclick_Promise = global_tab.click(
			".card-content h3[title='Interview Preparation Kit']"
		);

		let warmUpElem_Promise = global_tab.waitForSelector(
			"a[data-attr1='warmup']",
			{
				visible: true,
			}
		);

		let combined_Promise = Promise.all([
			interviewKitclick_Promise,
			global_tab.waitForNavigation({ waitUntil: "networkidle0" }),
			warmUpElem_Promise,
		]);

		return combined_Promise;
	})
	.then(function () {
		console.log("Interview Preparation Kit page Opened.");

		let warmUpclick_Promise = global_tab.click("a[data-attr1='warmup']");

		let sockMerchantElem_Promise = global_tab.waitForSelector(
			"a[data-attr1='sock-merchant']",
			{
				visible: true,
			}
		);

		let combined_Promise = Promise.all([
			warmUpclick_Promise,
			global_tab.waitForNavigation({ waitUntil: "networkidle0" }),
			sockMerchantElem_Promise,
		]);

		return combined_Promise;
	})
	.then(function () {
		console.log("Warm Up page Opened!");

		let clickQs_Promise = global_tab.click("a[data-attr1='sock-merchant']");

		let combined_Promise = Promise.all([
			clickQs_Promise,
			global_tab.waitForNavigation({ waitUntil: "networkidle0" }),
		]);

		return combined_Promise;
	})
	.then(function () {
		console.log("Entered Question's page!");
	})
	.catch(function (err) {
		console.log(err);
	});

console.log("after");
