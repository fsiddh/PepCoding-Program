try {
    let a = 10;
  
    b = a;
    // console.log(global);
//   console.log(global.b);
    delete a;
    b = undefined;
    console.log(a);
    console.log(b);
    console.log(c);
  } catch (err) {
    console.log(err.message);
  }