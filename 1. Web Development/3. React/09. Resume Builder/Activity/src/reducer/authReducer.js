import initialState from './initialState.json';
import * as actionTypes from '../actions/actionTypes';

export default function authReducer(state=initialState.auth,action){
    switch (action.type) {
        // login
        case actionTypes.SIGN_IN_FAILED:
            return {...state,loading:false,ErrorMessage:action.error}
        case actionTypes.SIGN_IN_REQUEST:
            return {...state,loading:true}
        case actionTypes.SIGN_IN_SUCCESS:
            return {...state,loading:false}
        case actionTypes.REMOVE_ERROR:

        // sign up
            return {...state,ErrorMessage:''}
        case actionTypes.REGISTER_REQUEST:
            return {...state,loading:true}
        case actionTypes.REGISTER_SUCCESS:
            return {...state,loading:false}
        case actionTypes.REGISTER_FAILED:
            return { ...state, loading: false, ErrorMessage: action.error }
        
        // logout
        case actionTypes.SIGN_OUT_FAILED:
            return {...state,ErrorMessage:action.error}
        default:
            return state
        
    }
}