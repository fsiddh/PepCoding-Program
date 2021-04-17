const google_link = "https://www.google.com";
const puppeteer = require("puppeteer");

// Things this file extracts about Hospital
// 1.Name
// 2.Contact Number
// 3.Address
// 4.Images
// 5.Rating
// 6.Open duration
// *finally saves in a pdf*
let hospital_page;
async function hospitalInfo(browserRef) {
	try {
		hospital_page = await browserRef.newPage();

		// Nav to google + auth + type + search
		await hospital_page.goto(google_link);
		await hospital_page.type(".gLFyf.gsfi", "hospitals near me", {delay: 50,});
        await hospital_page.keyboard.press("Enter");

        await hospital_page.waitForSelector(".dbg0pd span");

		// Gather info.
		let h_name = document.querySelector(".dbg0pd span").innerText;
		let h_rating = document.querySelector(".rllt__details.lqhpac div .BTtC6e").innerText;
		let h_number = document.querySelectorAll(".rllt__details.lqhpac div")[1].innerText.split("·")[1];
		let h_address = document.querySelectorAll(".rllt__details.lqhpac div")[1].innerText.split("·")[0];
		let h_openTimings = document.querySelectorAll(".rllt__details.lqhpac div")[2].innerText;

		let infoObj = {
			h_name,
			h_rating,
			h_number,
			h_address,
			h_openTimings,
        };
        
        return infoObj;
    } catch (error) {
        console.log(error);
    }
}

// async function waitAndEnter(selector) {
// 	await global_tab.waitForSelector(selector, { visible: true });
// 	// we didn't wait this promise because we want  the calling perspn to await this promise based async function
// 	let enterPromise = await hospital_page.keyboard.press("Enter");
// 	return enterPromise;
// }

module.exports = {
    hospitalFn: hospitalInfo,
}
