// copy 
// let person = {
//     firstName: 'John',
//     lastName: 'Doe'
// };
// //  copied person reference -> preson ke andar ke object ka 
// 1. address are copied ;
// let copiedPerson = person;
// console.log(copiedPerson);
// person.firstName="Steve";
// console.log(copiedPerson);

// copy -> fast 
// shallow copy 
let person = {
    firstName: 'John',
    lastName: 'Doe',
    address: {
        street: 'North 1st street',
        city: 'San Jose',
        state: 'CA',
        country: 'USA'
    }
};
// in case of shallow copy only high level keys are copied but 
// the internal objects are not copied instead there address is copied 

// spread operator  
// let topLevelObject = { ...person };
// person.address.street="12";
// person.lastName = "Rogers";
// topLevelObject.firstName = "Steve"
// console.log("person", person);
// console.log("top level ", topLevelObject);

//  object.assign 
// let topLevelObject = Object.assign({}, person);
// person.address.street="12";
// person.lastName = "Rogers";
// topLevelObject.firstName = "Steve";
// console.log("person", person);
// console.log("top level ", topLevelObject);
//  most costliest operation is JSON.parse and stringify 
// Deep copy
// console.log(JSON.stringify(person));
let topLevelObject = JSON.parse(JSON.stringify(person));
person.address.street = "12";
person.lastName = "Rogers";
topLevelObject.firstName = "Steve";
console.log("person", person);
console.log("top level ", topLevelObject);