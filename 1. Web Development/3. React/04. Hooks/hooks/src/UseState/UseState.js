import React, { useState } from "react";

function Us() {
	const [msgObj, setMessage] = useState({ message: "", id: 1 });
	const handleChange = (e) => {
		let val = e.target.value;
		// msgObj.message = val;
		// console.log(msgObj);
		// setMessage({...msgObj,message:val});
		let obj = { ...msgObj, message: val };
		setMessage(obj);
	};
	return (
		<div>
			<input
				type="text"
				value={msgObj.message}
				onChange={handleChange}
			></input>
			<p>{msgObj.message}</p>
		</div>
	);
}
export default Us;
