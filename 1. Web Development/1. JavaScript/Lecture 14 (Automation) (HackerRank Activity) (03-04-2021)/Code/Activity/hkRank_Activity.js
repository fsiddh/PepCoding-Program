const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets");
const { codes } = require("./code");

let global_tab;

console.log("before");

let browserPromise = puppeteer.launch({
	headless: false,
	defaultViewport: null,
	args: ["--start-maximized", "--incognito"],
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
		return loginButtonWillBeClicked_Promise;
	})
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		let interviewKitclick_Promise = waitAndClick(
			".card-content h3[title='Interview Preparation Kit']"
		);
		return interviewKitclick_Promise;
	})
	.then(function () {
		console.log("Interview Preparation Kit page Opened.");

		let warmUpclick_Promise = waitAndClick("a[data-attr1='warmup']");
		return warmUpclick_Promise;
	})
	.then(function () {
		console.log("Warm Up page Opened!");
		warmupPageUrl = global_tab.url();
		let code = codes[0];
		let questionPromise = questionSolver(
			code.qName,
			code.soln,
			warmupPageUrl
		);
		return questionPromise;
	})
	.catch(function (err) {
		console.log(err);
	});

function questionSolver(quesName, quesCode, warmupPageUrl) {
	return new Promise(function (resolve, reject) {
		let gotoWarmupPage_Promise = global_tab.goto(warmupPageUrl);
		gotoWarmupPage_Promise
			.then(function () {
				function browserConsoleRun(quesName) {
					let allQSelector = document.querySelectorAll("h4");
					let qNamesArr = [];

					for (let i = 0; i < allQSelector.length; i++) {
						let qName = allQSelector[i].innerText.split("\n")[0];
						qNamesArr.push(qName);
					}

					let qIdx = qNamesArr.indexOf(quesName);
					console.log("Question Number:", qIdx);

					allQSelector[qIdx].click();
				}

				let quesPageClick_Promise = global_tab.evaluate(
					browserConsoleRun,
					quesName
				);
				return quesPageClick_Promise;
			})
			.then(function () {
				console.log("reached question page");
				let inputWillBeClicked_Promise = waitAndClick(
					".custom-checkbox.inline"
				);
				return inputWillBeClicked_Promise;
			})
			.then(function () {
				console.log("checkbox clicked");
				let codeWillBeTyped_Promise = global_tab.type(
					".custominput",
					quesCode
				);
				return codeWillBeTyped_Promise;
			})
			.then(function () {
				console.log("input box code typed");
				let controlIsHoldPromise = global_tab.keyboard.down("Control");
				return controlIsHoldPromise;
			})
			.then(function () {
				let aisPressedpromise = global_tab.keyboard.press("a");
				return aisPressedpromise;
			})
			.then(function () {
				let cutPromise = global_tab.keyboard.press("x");
				return cutPromise;
			})
			.then(function () {
				console.log("code copied");
				let editorWillBeClickedPromise = global_tab.click(
					".monaco-editor.no-user-select.vs"
				);
				return editorWillBeClickedPromise;
			})
			.then(function () {
				let aisPressedpromise = global_tab.keyboard.press("a");
				return aisPressedpromise;
			})
			.then(function () {
				console.log("code pasted");
				let pastePromise = global_tab.keyboard.press("v");
				return pastePromise;
			})
			.then(function () {
				console.log("submit clicked");
				let submitIsClickedPromise = global_tab.click(
					".pull-right.btn.btn-primary.hr-monaco-submit"
				);
				return submitIsClickedPromise;
			})
			.then(function () {
				resolve();
			})
			.catch(function () {
				reject(err);
			});
	});
}

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
				.catch(function (err) {
					reject(err);
				});
		});
	});
}
