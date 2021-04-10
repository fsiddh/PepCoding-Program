const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets"); // imported email & paswrd
const { codes } = require("./code");

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
	//newpage open
	.then(function (browserReference) {
		// after launch -> we'll get browser's refrnce
		let newTab_Promise = browserReference.newPage(); // ".newPage()"(returns promise) for opening new TAB
		return newTab_Promise; // Necessary to return for Chained Promises!
	})
	//newpage->login page
	.then(function (newTabReference) {
		global_tab = newTabReference; //stores ref of newly created tab

		let loginPageWillBeOpened_Promise = global_tab.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login" //navigate to login page
		);
		return loginPageWillBeOpened_Promise;
	})
	//loginpage->email
	.then(function () {
		console.log("Login Page Opened");

		// type -> Types into a selector that identifies a form element
		let emailWillBeTyped_Promise = global_tab.type("#input-1", email, {
			delay: 100,
		}); // type(tag, email id , delay rate for typing)
		return emailWillBeTyped_Promise;
	})
	//loginpage->password
	.then(function () {
		console.log("email Entered!");

		let passwordWillBeType_Promise = global_tab.type("#input-2", password, {
			delay: 100,
		});
		return passwordWillBeType_Promise;
	})
	//loginpage will be clicked -> dashboard
	.then(function () {
		console.log("password Entered");

		let loginButtonWillBeClicked_Promise = global_tab.click(
			".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
		); // Perform a mouse click event on the element passed as parameter
		return loginButtonWillBeClicked_Promise;
	})
	//dashboard page open ,waited for html load,interview click -> interview
	.then(function () {
		console.log("Login Completed. Dashboard Page Opened!");

		// promise -> interview click event
		let interviewKitclick_Promise = waitAndClick(
			".card-content h3[title='Interview Preparation Kit']"
		);
		return interviewKitclick_Promise;
	})
	//interview page open,waited for html load,warmup click -> warmup
	.then(function () {
		console.log("Interview Preparation Kit page Opened.");

		// promise -> warmup button click
		let warmUpclick_Promise = waitAndClick("a[data-attr1='warmup']");
		return warmUpclick_Promise;
	})
	// warmup page opened
	.then(function () {
		console.log("Warm Up page Opened!");
		// Why we store warmup pg ? ->
		// Once we submit 1st ques code, we have to go back to warmupPage
		// instead of going back , directly go to warmupPage using the stored url
		warmupPageUrl = global_tab.url();

		let code = codes[0];
		let first_questionPromise = questionSolver(
			code.qName,
			code.soln,
			warmupPageUrl
		);
		for (let i = 1; i < codes.length; i++) {
			first_questionPromise = first_questionPromise.then(function () {
				return questionSolver(
					codes[i].qName,
					codes[i].soln,
					warmupPageUrl
				);
			});
		}

		return first_questionPromise;
	})
	.then(function () {
		console.log("All Questions Submitted!");
	})
	.catch(function (err) {
		console.log(err);
	});

// go to warmup page
// click given quesName
// type code inputbox
// copy code
// paste in editor
// submit
function questionSolver(quesName, quesCode, warmupPageUrl) {
	return new Promise(function (resolve, reject) {
		// Why we "goto" warmup pg again? ->
		// For the first qs it's uneccessary but for later qs, we'll have to again go to warmup pg,
		// and then from there navigate to the qs!
		let gotoWarmupPage_Promise = global_tab.goto(warmupPageUrl);
		gotoWarmupPage_Promise
			// go to given quesName page
			.then(function () {
				// dynamically store all qs names on the warmup pg in an arr.
				// execute the fn for quesName if quesName == arr[i].
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
			// select custom input checkbox (cursor b ajata)
			.then(function () {
				// checkbox click
				console.log("reached question page");
				let inputWillBeClicked_Promise = waitAndClick(
					".custom-checkbox.inline"
				);
				return inputWillBeClicked_Promise;
			})
			// type code
			.then(function () {
				console.log("checkbox clicked");
				let codeWillBeTyped_Promise = global_tab.type(
					".custominput",
					quesCode
				);
				return codeWillBeTyped_Promise;
			})
			// In custom input box ->
			// ctrl + A  // typed code select
			// ctrl + X  // typed code copied
			.then(function () {
				console.log("input box code typed");
				let controlIsHoldPromise = global_tab.keyboard.down("Control"); //ctrl dabake rkha
				return controlIsHoldPromise;
			})
			.then(function () {
				let aisPressedpromise = global_tab.keyboard.press("a"); // ctrl dabake rkha + A clicked
				return aisPressedpromise;
			})
			.then(function () {
				let cutPromise = global_tab.keyboard.press("x");
				return cutPromise;
			})
			// click editor
			// ctrl + A  //template code hatana h
			// ctrl + V  // copied code from inputbox pase krna editor me
			.then(function () {
				console.log("code copied");
				let editorWillBeClickedPromise = global_tab.click(
					".monaco-editor.no-user-select.vs"
				); // editor pr cursor le ae
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
			// click submit button
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

// wait for slector to load and click selector
function waitAndClick(selector) {
	return new Promise(function (resolve, reject) {
		let selectorWaitPromise = global_tab.waitForSelector(selector, {
			visible: true,
		}); // wait selector to load
		selectorWaitPromise.then(function () {
			let selectorClickPromise = global_tab.click(selector); // click
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
