import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import BallContainer from "./BallContainer";
import BatContainer from "./BatContainer";
import UserContainer from "./UserContainer";
function App() {
	return (
		<Provider store={store}>
			<div className="App">
				{/* <BallContainer /> */}
				{/* <BatContainer /> */}
				{/* <UserContainer /> */}
			</div>
		</Provider>
	);
}

export default App;
