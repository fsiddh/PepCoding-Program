import {SET_SKIN,UPDATE_SKIN} from './actionTypes';

// a way to not install just import
const {v4:uuidv4} = require('uuid');

// for resume template selection -> set skin, update skin
export const setSkinCd = (skinCd)=>{
    let id = uuidv4();
    return { type:SET_SKIN,document:{skinCd:skinCd,id:id} }
}

export const updateSkinCd = (skinCd)=>{
    return {type:UPDATE_SKIN,document:{ skinCd:skinCd}}
}