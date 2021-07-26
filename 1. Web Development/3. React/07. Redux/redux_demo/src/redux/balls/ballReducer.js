const initialState = {
	numofBalls: 20,
};
const BUY_BALL = "BUY_BALL";
const BallReducer = (state = initialState, action) => {
	console.log(state);
	switch (action.type) {
		case BUY_BALL:
			return { ...state, numofBalls: state.numofBalls - 1 };
		default:
			return state;
	}
};
export default BallReducer;
