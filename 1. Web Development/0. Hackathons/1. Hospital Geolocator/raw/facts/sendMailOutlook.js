const authObj = require("../../auth_details.js");

const outlookLogin =
	"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1618666402&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26RpsCsrfState%3db9479616-c879-c065-a25e-42d2f4ad6754&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015";

// waits for selctor to load -> types with normal speed -> waits -> Enter
async function waitTypeAndEnter(selector, data) {
    await mail_page.waitForSelector(selector, { visible: true});
    await mail_page.type(selector, data, { delay: 100 });
    await mail_page.waitForTimeout(1500);
    return mail_page.keyboard.press("Enter");
}

// waits for selctor to load -> waits -> clicks the selector
async function waitAndClick(selector) {
    await mail_page.waitForSelector(selector, { visible: true});
    await mail_page.waitForTimeout(500);
    return mail_page.click(selector);
}

let mail_page;
async function mail(browserRef, recieverEmail) {
	try {
        mail_page = await browserRef.newPage();
        
        // Outlook Login Page -> type email+Enter -> type Password+Enter -> Signin
        await mail_page.goto(outlookLogin);
        await waitTypeAndEnter("#i0116", authObj.email);
        // await waitTypeAndEnter("input#i0118", "t");
        // await waitTypeAndEnter("input#i0118", "test");await global_tab.keyboard.down("Control");
        await mail_page.waitForTimeout(500);

        // Error Fix: Password typing error fixed by ->  cltr+a -> backspace -> then type pswrd
		await mail_page.keyboard.down("Control");
        await mail_page.keyboard.press("a");
        await mail_page.keyboard.up("Control");
		await mail_page.keyboard.press('Backspace')

        // type password
        await waitTypeAndEnter("input#i0118", authObj.password);
        
        // click NewMesg -> type recievers email -> subject -> write body -> send
        await waitAndClick("#id__7");
        await waitTypeAndEnter("input.ms-BasePicker-input.pickerInput_43ffcad1", recieverEmail);
        await waitTypeAndEnter("input[placeholder='Add a subject']", "Subject");        
        await waitTypeAndEnter("div._4utP_vaqQ3UQZH0GEBVQe.B1QSRkzQCtvCtutReyNZ.CAUXSSmBTHvYTez0U6p3M._17ghdPL1NLKYjRvmoJgpoK._2s9KmFMlfdGElivl0o-GZb", "Test Body");
        
        // Pressing Send Method
        // cltr+Enter, automatically presses send key
        await mail_page.keyboard.down("Control");
        await mail_page.keyboard.press("Enter");
        await mail_page.keyboard.up("Control");
        
        // wait -> close page
        await mail_page.waitForTimeout(200);
        await mail_page.close();

        //return cnfrmation mesg
        let confirmationMesg = "Mail Sent to: "+recieverEmail; 
        return confirmationMesg

	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	mailFn: mail,
};