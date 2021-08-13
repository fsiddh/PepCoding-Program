import {ADD_CONTACT,UPDATE_CONTACT} from './actionTypes';

export const add = (contactSection)=>{
    return {type:ADD_CONTACT,contactSection:contactSection}

}

export const update = (contactSection)=>{
    return {type:UPDATE_CONTACT,contactSection:contactSection}
}