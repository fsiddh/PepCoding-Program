import React, { useEffect, useState } from "react";
//2nd variation
// ComponentDidMount
// there is presence of dependency array
// empty dependency array
function Ue2() {
	const [count, setCount] = useState(0);
	useEffect(() => {
		console.log("useEffect");
		document.title = `Clicked ${count} times`;
	}, []);
	console.log("render");
	return (
		<div>
			<p>You clicked the button {count} times</p>
			<button
				onClick={() => {
					console.log("Hello");
					setCount(count + 1);
				}}
			>
				Click
			</button>
		</div>
	);
}

export default Ue2;
