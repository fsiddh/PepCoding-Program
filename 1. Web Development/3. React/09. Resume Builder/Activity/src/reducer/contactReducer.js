import initialState from './initialState.json';
import { ADD_CONTACT, UPDATE_CONTACT } from '../actions/actionTypes';

export default function contactReducer(state=initialState.contactSection,action){
    switch(action.type)
    {
        case ADD_CONTACT:
            return {...action.contactSection}

        case UPDATE_CONTACT:
            return {...action.contactSection}

        default:
            return state;
    }
}