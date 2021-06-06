ratings = watchList.map(function(obj){
    return {title:obj.Title, rating:obj.imdbRating}
  })
/////////////////////////////////////////////////////////////////////
  var filteredList;
filteredList = watchList.map(function(obj){
  return{title:obj.Title, rating:obj.imdbRating};
})
filteredList = filteredList.filter(function(obj){
  return Number(obj.rating)>=8.0
})
// Only change code above this line


///////////////////////////////////////////////////////////////////
const squareList = arr => {
    // Only change code below this line
    arr = arr.filter(function(el){
      return el>0 && el % parseInt(el)===0
    })
    arr = arr.map(function(el)
    {
      return el*el;
    })
    return arr;
    // Only change code above this line
  };
  
  const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
  console.log(squaredIntegers);

  ////////////////////////////////////////////////////////////////////////

  function getRating(watchList){
    // Only change code below this line
    var averageRating;
    let cnfa = watchList.filter(function(el)
    {
      return el.Director==='Christopher Nolan';
    })
    averageRating = cnfa.map(function(el)
    {
      return Number(el.imdbRating);
    }).reduce(function(acc,cval)
    {
      return acc+cval;
    })/cnfa.length;
  
    // Only change code above this line
    return averageRating;
  }
  console.log(getRating(watchList));