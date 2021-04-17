const puppeeteer = require("puppeteer");
const hospitalFnObj = require("./Utilities/hospital.js");
const { email, password } = require("../auth_details.js");

(async function () {
	try {
		let browserRef = await puppeeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized"],
		});

        let x = await hospitalFnObj.hospitalFn(browserRef);
        console.log(x);
    } catch (error) {
        console.log(error)
    }
})();
