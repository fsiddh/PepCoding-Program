let state ={
    name:'Tushar',
    age:22,
    country:'India'
}

// let copy = state;

// copy.country = 'Spain';

// console.log(state);
// console.log(copy);

///////////////using spread operator

let copy = {...state};
copy.country='Spain';
console.log(state);
console.log(copy);
