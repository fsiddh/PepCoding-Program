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

		let loginButtonWillBeClicked_Promise = global_tab.click(
			".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
		); // Perform a mouse click event on the element passed as parameter

		// waits -> html selectors to load
		let interviewKitElem_Promise = global_tab.waitForSelector(
			".card-content h3[title='Interview Preparation Kit']",
			{
				visible: true, // when UI appears, only then proceed
			}
		);

		// combined_Promise executes only when all promises inside of it gets resolved.
		// Jab sare promises resolves ho jaye return cP. This ensures click is resolved, apn agle page pr
		// pohoch jaye and finally us next pg ka data load ho jaye.
		let combined_Promise = Promise.all([
			loginButtonWillBeClicked_Promise, //promise for click event
			global_tab.waitForNavigation({ waitUntil: "networkidle0" }), //promise for navigation event
			interviewKitElem_Promise, //promise for html selector of interview kit pg
		]);

		return combined_Promise;
	})
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		// promise -> interview click event
		let interviewKitclick_Promise = global_tab.click(
			".card-content h3[title='Interview Preparation Kit']"
		);

		// promise -> warmup page html load
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

		// promise -> warmup button click
		let warmUpclick_Promise = global_tab.click("a[data-attr1='warmup']");

		// promise -> next page html load
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
		console.log("Entered question page!!!!!!!!!!!!!!!!!!!!!!!!");
	})
	.catch(function (err) {
		console.log(err);
	});

console.log("after");
