const puppeteer = require("puppeteer");
const links = [
	"https://www.amazon.in",
	"https://www.flipkart.com",
	"https://paytmmall.com/",
];

let pName = process.argv[2];
let amazon_gtab;
let flipkart_gtab;
let paytmmall_gtab;

console.log("Before");

(async function () {
	try {
		let browserReference = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized"],
		});

		let amazonDetails = await getListingFromAmazon(
			pName,
			links[0],
			browserReference
		);
		let flipkartDetails = await getListingFromFlipkart(
			pName,
			links[1],
			browserReference
		);
		let paytmmallDetails = await getListingFromPaytm(
			pName,
			links[2],
			browserReference
		);

		console.table(amazonDetails);
		console.table(flipkartDetails);
		console.table(paytmmallDetails);
	} catch (err) {
		console.log(err);
	}
})();

async function getListingFromAmazon(pName, link, browserReference) {
	amazon_gtab = await browserReference.newPage();
	await amazon_gtab.goto(link);
	await amazon_gtab.type("#twotabsearchtextbox", pName);
	await amazon_gtab.click("#nav-search-submit-button");

	await amazon_gtab.waitForSelector(".a-price-whole", { visible: true });

	function consoleFn(pNameSelector, priceSelector) {
		let pNameArr = document.querySelectorAll(pNameSelector);
		let priceArr = document.querySelectorAll(priceSelector);

		let details = [];
		for (let i = 0; i < 5; i++) {
			let productName = pNameArr[i].innerText;
			let price = priceArr[i].innerText;

			details.push({
				Name: productName,
				Price: price,
			});
		}
		return details;
	}
	return amazon_gtab.evaluate(
		consoleFn,
		".a-size-medium.a-color-base.a-text-normal",
		".a-price-whole"
	);
}

async function getListingFromFlipkart(pName, link, browserReference) {
	flipkart_gtab = await browserReference.newPage();

	await flipkart_gtab.goto(link);

	await flipkart_gtab.waitForSelector("._2KpZ6l._2doB4z", { visible: true });
	await flipkart_gtab.click("._2KpZ6l._2doB4z");

	await flipkart_gtab.type("._3704LK", pName);
	await flipkart_gtab.click("._34RNph");

	await flipkart_gtab.waitForSelector("._4rR01T", { visible: true });

	function consoleFn(pNameSelector, priceSelector) {
		let pNamrArr = document.querySelectorAll(pNameSelector);
		let priceArr = document.querySelectorAll(priceSelector);

		let detailsArr = [];
		for (let i = 0; i < 5; i++) {
			let pName = pNamrArr[i].innerText;
			let price = priceArr[i].innerText;
			detailsArr.push({
				Name: pName,
				Price: price,
			});
		}
		return detailsArr;
	}
	return flipkart_gtab.evaluate(consoleFn, "._4rR01T", "._30jeq3._1_WHN1");
}

async function getListingFromPaytm(pName, link, browserReference) {
	paytmmall_gtab = await browserReference.newPage();

	await paytmmall_gtab.goto(link);
	await paytmmall_gtab.type("#searchInput", pName, { delay: 100 });
	await paytmmall_gtab.keyboard.press("Enter");

	await paytmmall_gtab.waitForSelector("._1kMS", { visible: true });

	function consoleFn(pNameSelector, priceSelector) {
		let pNamrArr = document.querySelectorAll(pNameSelector);
		let priceArr = document.querySelectorAll(priceSelector);

		let detailsArr = [];
		for (let i = 0; i < 5; i++) {
			let pName = pNamrArr[i].innerText;
			let price = priceArr[i].innerText;
			detailsArr.push({
				Name: pName,
				Price: price,
			});
		}
		return detailsArr;
	}
	return paytmmall_gtab.evaluate(consoleFn, ".UGUy", "._1kMS");
}
