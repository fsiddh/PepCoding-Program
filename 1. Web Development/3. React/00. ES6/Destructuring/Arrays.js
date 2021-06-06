let introduction= ['Hello','I','am','Tushar'];
// let greeting = introduction[0];
// let pronoun = introduction[1];
// let variable = introduction[2];
// console.log(greeting+" "+pronoun+" "+variable);
//////////////////////////////////////////Destructuring

// let [greeting,pronoun,variable,name] = introduction;
// console.log(greeting+" "+pronoun+" "+variable+" "+name);
// greeting='Hola';
// console.log(introduction);

////////////////////////skipping values

let [greeting,pronoun,,name]=introduction;
console.log(greeting+" "+pronoun+" "+name); 

/////////////////////////////////Default values

let arr =['Howdy'];
let [ab='hello',cd='bye',ef='say']=arr;
console.log(ab+" "+cd+" "+ef);

//////////////////////////////////swapping values

let a =3;
let b=6;
[a,b] =[b,a];
console.log(a);
console.log(b);