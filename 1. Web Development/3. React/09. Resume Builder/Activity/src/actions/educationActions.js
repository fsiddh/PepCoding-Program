import { ADD_EDUCATION, UPDATE_EDUCATION } from './actionTypes';

export const add = (educationSection)=>{
    return {type:ADD_EDUCATION,educationSection:educationSection}

}

export const update = (educationSection)=>{
    return {type:UPDATE_EDUCATION,educationSection:educationSection}
}