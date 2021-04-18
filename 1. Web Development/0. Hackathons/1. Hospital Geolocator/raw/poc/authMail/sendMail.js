const nodemailer = require("nodemailer");
const fs = require("fs");
const recieverEmail = "falansh.rs@gmail.com";

await gmailsend(recieverEmail);

async function gmailsend(recieverEmail) {
	let data = await fs.promises.readFile(auth_details, "utf-8");
	let credentials = JSON.parse(data);
	console.log(credentials);
	email = credentials.email;
	password = credentials.password;

	let transport = nodemailer.createTransport({
		service: "hotmail",
		auth: {
			user: email,
			pass: password,
		},
	});
	let message = {
		from: email,
		to: recieverEmail,
		subject: "reg: Hospital Details",
		text: "Hospital details along with its Images.",
		attachments: [
			{
				filename: "test_file.txt",
				path: `./test_file.txt`,
			},
		],
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
