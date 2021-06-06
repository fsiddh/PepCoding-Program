const user={
    id:229,
    name:'Tushar',
    age:22,
    education:{
        degree:'Masters',
        school:{
            name:'SPS',
            location:'Pitampura'
        }
    }
}

// const {name} = user;
// console.log(name);

// const {education:{degree}} = user;
// console.log(degree);

const {education:{school:{location}}}=user;
console.log(location);