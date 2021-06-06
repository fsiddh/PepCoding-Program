// class abc{
//     constructor(name,age)
//     {
//         this.name= name;
//         this.age = age;
//         this.hobby ='music'
//     }
//     sayHi(){
//         console.log('Hello');
//         // console.log(this.name);
//         console.log(this);
//     }
//     sayBye()
//     {
//         console.log('Bye');
//     }
// }

// let obj = new abc('Tuhsar',22);
// console.log(obj);
// // // obj.sayHi();
// // let ret = obj.sayHi;
// // ret();

// let btn = document.querySelector('button');
// btn.addEventListener('click',obj.sayHi);

/////////////////////////////////////////Bind


// class abc{
//     constructor(name,age)
//     {
//         this.name= name;
//         this.age = age;
//         this.hobby ='music',
//         this.sayHi = this.sayHi.bind(this)
//     }
//     sayHi(){
//         console.log('Hello');
//         // console.log(this.name);
//         console.log(this);
//     }
//     sayBye()
//     {
//         console.log('Bye');
//     }
// }

// let obj = new abc('Tuhsar',22);
// console.log(obj);
// // // obj.sayHi();
// let ret = obj.sayHi;
// ret();

// let btn = document.querySelector('button');
// btn.addEventListener('click',obj.sayHi);

/////////////////////////Arrow fn



class abc{
    constructor(name,age)
    {
        this.name= name;
        this.age = age;
        this.hobby ='music'
    }
    sayHi=()=>{
        console.log('Hello');
        // console.log(this.name);
        console.log(this);
    }
    sayBye()
    {
        console.log('Bye');
    }
}

let obj = new abc('Tuhsar',22);
console.log(obj);
// // obj.sayHi();
// let ret = obj.sayHi;
// ret();

let btn = document.querySelector('button');
btn.addEventListener('click',obj.sayHi);
