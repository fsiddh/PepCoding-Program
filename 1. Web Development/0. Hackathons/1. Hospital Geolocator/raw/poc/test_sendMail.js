const { email, password } = require("../../auth_details");

async function gmailsend() {
	let transport = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465, //587 for false
		secure: true, // use SSL
		service: "gmail",
		auth: {
			user: email,
			pass: password,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	let message = {
		from: email,
		to: to1,
		subject: "reg: Hospital Details",
		text: "Hospital details along with its Images.",
		// attachments: [
		// 	{
		// 		filename: "falansh.pdf",
		// 		path: `./page2.pdf`,
		// 	},
		// ],
	};
	transport.sendMail(message, function (err) {
		if (err) {
			console.log("Failed to send email.\n" + err.message);
			return;
		}
		console.log(`Email sent to ${to1} \n check your email.`);
	});
}

module.exports = {
	gmailsendFn: gmailsend,
};
