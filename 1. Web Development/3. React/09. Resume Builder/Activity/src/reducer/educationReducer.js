import initialState from './initialState.json';
import { ADD_EDUCATION, UPDATE_EDUCATION } from '../actions/actionTypes';

export default function educationReducer(state=initialState.educationSection,action){
    switch(action.type)
    {
        case ADD_EDUCATION:
            return {...action.educationSection}

        case UPDATE_EDUCATION:
            return {...action.educationSection}

        default:
            return state;
    }
}