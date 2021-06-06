let person = {
    name:'Steve',
    country:'Los Angeles',
    job:'Avenger'
}

// let name = person.name;
// let country = person['country'];
// let job = person.job;

// console.log(name);
// console.log(country);
// console.log(job);
///////////////////////////////////Destructuring

// let {name,country,job}=person;
// console.log(name);
// console.log(country);
// console.log(job);
//////////////////////////////////////Undefined && default values


var {name,country,job='jobs',anything:abcd='default value'}=person;
console.log(name);
console.log(country);
console.log(job);
console.log(abcd);

//////////////////////////////////////////Alias

// let {name:a,country:b,job:c}=person;
// console.log(a);
// console.log(b);
// console.log(c);
