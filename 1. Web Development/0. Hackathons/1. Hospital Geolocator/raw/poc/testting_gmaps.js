const google_link = "https://www.google.com";

let gmap_page;
async function gMaps(browserRef, hospital_name) {
	try {
		gmap_page = await browserRef.newPage();

		// Search hospital name -> open its direction
		await gmap_page.goto(google_link);
		await gmap_page.type(".gLFyf.gsfi", hospital_name, { delay: 50 });
		await gmap_page.keyboard.press("Enter");
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	gMapsFn: gMaps,
};
