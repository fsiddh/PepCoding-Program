Title: 
The parser 

Meta-Tags:
Javascript, JS, interview, questions, interview questions, JSON, parse, stringify,practice

Description:
Find output of the following:

let obj = {"concept":""};


console.log(
  JSON.parse(
    JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12)
  ).concept
);


Options: 
A)
Error

B)
undefined


C)
JSON 

D)
[Object Object]


Solution:
C 