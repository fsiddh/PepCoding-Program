// action creators -> They basically returns an ACTION(ie an object)

const BUY_BALL = "BUY_BALL"; // if I need to make a change I can do it here and it will get reflected everywhere

export const buyBall = () => {
	return {
		type: BUY_BALL,
	};
};
