import initialState from './initialState.json';
import {SET_SKIN,UPDATE_SKIN} from '../actions/actionTypes';

// reducer for document action
/* action = {
    type:SET_SKIN/UPDATE_SKIN,
    document:{skinCd:skinCd,id:id}
}
    state -> initialState.json
*/
export default function documentReducer(state=initialState.document,action){
    switch(action.type){
        case SET_SKIN:
            return {...state,id:action.document.id,skinCd:action.document.skinCd}
        case UPDATE_SKIN:
            return {...state,skinCd:action.document.skinCd}
        default:
            return state
    }
}