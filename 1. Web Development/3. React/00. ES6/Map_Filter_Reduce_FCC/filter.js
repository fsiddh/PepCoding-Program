
let words =['spray','limit','elite','politeness','destruction'];
// let nwords=[];
// for(let i=0;i<words.length;i++)
// {
//     if(words[i].length>6)
//     {
//         nwords.push(words[i]);
//     }
// }
// console.log(nwords);

let nwords = words.filter(function(el)
{
    //true ya false
    return el.length>6
})
console.log(nwords);