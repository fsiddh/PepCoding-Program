import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
} from "./userTypes";
import axios from "axios";
export const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};
export const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};
export const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	};
};
export const fetchUsers = () => {
	return async (dispatch) => {
		dispatch(fetchUsersRequest());
		try {
			let res = await axios.get(
				"https://jsonplaceholder.typicode.com/users"
			);
			let users = res.data;
			dispatch(fetchUsersSuccess(users));
		} catch (e) {
			let errorMsg = e.message;
			dispatch(fetchUsersFailure(errorMsg));
		}
	};
};
