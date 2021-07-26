import React from "react";
import { buyBall } from "./redux/balls/BallActions";
import { connect } from "react-redux";
function BallContainer(props) {
	console.log("ball render");
	return (
		<div>
			<h2>Number of Balls- {props.numofBalls}</h2>
			<button onClick={props.buyBall}>Buy Balls</button>
		</div>
	);
}
//first method for reading from global state
const mapStateToProps = (state) => {
	return {
		numofBalls: state.ball.numofBalls,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		buyBall: () => dispatch(buyBall()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BallContainer);
