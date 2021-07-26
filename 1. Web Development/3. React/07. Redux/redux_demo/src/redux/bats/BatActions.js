const BUY_BAT = "BUY_BAT";
export const buyBat = (number = 1) => {
	return {
		type: BUY_BAT,
		payload: number,
	};
};
const SELL_BAT = "SELL_BAT";
export const sellBat = (number = 1) => {
	return {
		type: SELL_BAT,
		payload: number,
	};
};
