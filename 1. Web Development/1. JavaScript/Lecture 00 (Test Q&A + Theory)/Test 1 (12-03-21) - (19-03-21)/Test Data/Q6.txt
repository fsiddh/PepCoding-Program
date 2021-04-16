Title: 
Play with the truth

Meta-Tags:
Javascript, JS, interview, questions, interview questions,type coercion, truthy and falsy values, practice 

Description:
Find output of the following:

(function () {
  if ((-100 && 100 && "0") || [] === true || 0) {
    console.log(1);
    if ([] || (0 && false)) {
      console.log(2);
    }

    if (Infinity && NaN && "false") {
      console.log(3);
      if ("") {
        console.log(4);
      }
    } else {
      console.log(5);
      if (({} || false === "") && !(null && undefined)) {
        console.log(6);
      }
    }
  } else {
    console.log(7);
  }
})();

Options: A) 1 3
         B) 7
         C) 1 2 5 6
         D) 1 3 4


Solution:
C 