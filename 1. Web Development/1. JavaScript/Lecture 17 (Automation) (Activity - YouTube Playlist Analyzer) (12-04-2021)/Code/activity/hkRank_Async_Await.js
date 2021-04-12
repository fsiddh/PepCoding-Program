const puppeteer = require("puppeteer");
const { email, password } = require("../../secrets");
const { codes } = require("./code");

let global_tab;
let warmupPageUrl;

console.log("before");

(async function () {
	try {
		let browserReference = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized", "--incognito"],
		});

		global_tab = await browserReference.newPage();
		await global_tab.goto(
			"https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login"
		);
		await global_tab.type("#input-1", email, { delay: 100 });
		await global_tab.type("#input-2", password, { delay: 100 });
		await global_tab.click("button[data-analytics='LoginPassword']");
		await waitAndClick(
			".card-content h3[title='Interview Preparation Kit']"
		);
		await waitAndClick("a[data-attr1='warmup']");

		warmupPageUrl = global_tab.url();
		for (let i = 0; i < codes.length; i++) {
			await questionSolver(codes[i].qName, codes[i].soln, warmupPageUrl);
		}
	} catch (err) {
		console.log(err);
	}
})();

async function questionSolver(quesName, quesCode, url) {
	try {
		await global_tab.goto(warmupPageUrl);

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
		await global_tab.evaluate(browserConsoleRun, quesName);

		await waitAndClick(".custom-checkbox.inline");
		await global_tab.type(".custominput", quesCode);
		await global_tab.keyboard.down("Control");
		await global_tab.keyboard.press("a");
		await global_tab.keyboard.press("x");
		await global_tab.click(".monaco-editor.no-user-select.vs");
		await global_tab.keyboard.press("a");
		await global_tab.keyboard.press("v");
		await global_tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
	} catch (err) {
		console.log(err);
	}
}

async function waitAndClick(selector) {
	await global_tab.waitForSelector(selector, { visible: true });
	// we didn't wait this promise because we want  the calling perspn to await this promise based async function
	let click_promise = global_tab.click(selector);
	return click_promise;
}
