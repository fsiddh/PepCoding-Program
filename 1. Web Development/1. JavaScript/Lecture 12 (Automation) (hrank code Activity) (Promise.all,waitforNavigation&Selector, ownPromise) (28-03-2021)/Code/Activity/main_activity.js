const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets"); 

let global_tab; 

console.log("before");

let browserPromise = puppeteer.launch({
	headless: false, //
	// defaultViewport: null,
	// args: ["--start-maximized", "--incognito"],
});

browserPromise
	.then(function (browserReference) {
		let newTab_Promise = browserReference.newPage();
		return newTab_Promise;
	})
	.then(function (newTabReference) {
		global_tab = newTabReference;

		let loginPageWillBeOpened_Promise = global_tab.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"
		);
		return loginPageWillBeOpened_Promise;
	})
	.then(function () {
		console.log("Login Page Opened");

		let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {
			delay: 100,
		});
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
		);

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
		console.log("Entered question page!!!!!!!!!!!!!!!!!!!!!!!!");
	})
	.catch(function (err) {
		console.log(err);
	});

console.log("after");
