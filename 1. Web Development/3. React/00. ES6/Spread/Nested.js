let state = {
    name:'Tushar',
    address:{
        city:'London',
        country:{
            countryName:'United Kingdom',
            countryCode:'UK'
        }
    }
}

// let copy = {...state}
//This is known as our shallow copy

// Shallow copy int his context means that for any given object that is spread, the uppermost level
//  of the new variable is an object containing the same property values of the original object, but at a new
//  refrence in the memory.
// Any lower level nested objects however, will keep on  ointing to their original refrences

// let copy = {...state,address:{...state.address}};
// let copy= {...state,address:{...state.address,country:{...state.address.country}}}

let copy = JSON.parse(JSON.stringify(state));

// copy.address.city='Delhi';
// copy.name='Alexander';

copy.address.country.countryName='India';
console.log(state);
console.log(copy);