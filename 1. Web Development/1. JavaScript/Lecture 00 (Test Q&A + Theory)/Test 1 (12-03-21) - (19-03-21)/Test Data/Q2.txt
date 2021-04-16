Title: 
4X Scope 

Meta-Tags:
 Javascript, JS, interview, questions, interview questions,variables,scope,practice

Description:
Find output of the following:


let a = 2;
{
  let a = 3;
  {
    let a = 4;
    {
      let a = 5;
      console.log(a);
    }
    console.log(a);
  }
  console.log(a);
}
console.log(a);


Options:
A)  5
    4
    3
    2

B)  Error

C)  2
    3
    4
    5

D)  2
    2
    2
    2

Solution:
A 