Title:
Mystery E-commerce

Meta-Tags:
Javascript, JS, interview, questions, interview questions, objects,functions,practice,medium 

Description:
You are owner of a mystery e-commerce website. The special thing about this e-commerce store is the user can only buy a single item once! and all users have unique names.

You are given a users database in the form of an objects' Array.
Complete the function definition of 'updateUsers' function to perform the following tasks:

1- Create user if does not exist,add orders if any and return users
2- Create and Initialize order's array if it does not exist and add first order and return users
3- Add order to existing order's array and return users
4- If the item is already ordered return  {msg:"Already ordered!"}


Sample Input:
Input is handled for you

Sample Output:
Output is handled for you

Code:
let users = [
  {
    name: "Rajneesh",
    age: 34,
    address: {
      local: "22 Alaknanda",
      city: "Dehradun",
      state: "UK",
    },
    orders: [{ id: 1, name: "GOT Book Series" }],
  },
  {
    name: "Bhavesh",
    age: 37,
    address: {
      local: "48 DT Row",
      city: "Hyderabad",
      state: "AP",
    },
  },
  {
    name: "Jasbir",
    age: 38,
    address: {
      local: "196 Lama Bhavan",
      city: "Gangtok",
      state: "Sikkim",
    },
    orders: [
      { id: 1, name: "Chair" },
      { id: 2, name: "PS5" },
    ],
  },
];

function updateUsers(users, userObject, item) {
  //write your code here
}

console.log(
  JSON.stringify(
    updateUsers(
      users,
      {
        name: "Rajneesh",
        age: 34,
        address: {
          local: "22 Alaknanda",
          city: "Dehradun",
          state: "UK",
        },
      },
      "GOT Book Series"
    )
  )
);

console.log(
  JSON.stringify(
    updateUsers(users, {
      name: "Ravi",
      age: 24,
      address: {
        local: "25 Iroda",
        city: "Dehradun",
        state: "UK",
      },
    })
  )
);

console.log(
  JSON.stringify(
    updateUsers(
      users,
      {
        name: "Ravi",
        age: 24,
        address: {
          local: "25 Iroda",
          city: "Dehradun",
          state: "UK",
        },
      },
      "Chair"
    )
  )
);

console.log(
  JSON.stringify(
    updateUsers(
      users,
      {
        name: "Rajneesh",
        age: 34,
        address: {
          local: "22 Alaknanda",
          city: "Dehradun",
          state: "UK",
        },
      },
      "Fan"
    )
  )
);


Test Cases:

    Input (already part of code):
    console.log(
  JSON.stringify(
    updateUsers(
      users,
      {
        name: "Rajneesh",
        age: 34,
        address: {
          local: "22 Alaknanda",
          city: "Dehradun",
          state: "UK",
        },
      },
      "GOT Book Series"
    )
  )
);

console.log(
  JSON.stringify(
    updateUsers(users, {
      name: "Ravi",
      age: 24,
      address: {
        local: "25 Iroda",
        city: "Dehradun",
        state: "UK",
      },
    })
  )
);

console.log(
  JSON.stringify(
    updateUsers(
      users,
      {
        name: "Ravi",
        age: 24,
        address: {
          local: "25 Iroda",
          city: "Dehradun",
          state: "UK",
        },
      },
      "Chair"
    )
  )
);

console.log(
  JSON.stringify(
    updateUsers(
      users,
      {
        name: "Rajneesh",
        age: 34,
        address: {
          local: "22 Alaknanda",
          city: "Dehradun",
          state: "UK",
        },
      },
      "Fan"
    )
  )
);


Output:
[{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Bhavesh","age":37,"address":{"local":"48 DT Row","city":"Hyderabad","state":"AP"}},{"name":"Jasbir","age":38,"address":{"local":"196 Lama Bhavan","city":"Gangtok","state":"Sikkim"},"orders":[{"id":1,"name":"Chair"},{"id":2,"name":"PS5"}]},{"name":"Rajneesh","age":34,"address":{"local":"22 
Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]}]
[{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Bhavesh","age":37,"address":{"local":"48 DT Row","city":"Hyderabad","state":"AP"}},{"name":"Jasbir","age":38,"address":{"local":"196 Lama Bhavan","city":"Gangtok","state":"Sikkim"},"orders":[{"id":1,"name":"Chair"},{"id":2,"name":"PS5"}]},{"name":"Rajneesh","age":34,"address":{"local":"22 
Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Ravi","age":24,"address":{"local":"25 Iroda","city":"Dehradun","state":"UK"}}]
[{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Bhavesh","age":37,"address":{"local":"48 DT Row","city":"Hyderabad","state":"AP"}},{"name":"Jasbir","age":38,"address":{"local":"196 Lama Bhavan","city":"Gangtok","state":"Sikkim"},"orders":[{"id":1,"name":"Chair"},{"id":2,"name":"PS5"}]},{"name":"Rajneesh","age":34,"address":{"local":"22 
Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Ravi","age":24,"address":{"local":"25 Iroda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"Chair"}]}]
[{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Bhavesh","age":37,"address":{"local":"48 DT Row","city":"Hyderabad","state":"AP"}},{"name":"Jasbir","age":38,"address":{"local":"196 Lama Bhavan","city":"Gangtok","state":"Sikkim"},"orders":[{"id":1,"name":"Chair"},{"id":2,"name":"PS5"}]},{"name":"Rajneesh","age":34,"address":{"local":"22 
Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"GOT Book Series"}]},{"name":"Ravi","age":24,"address":{"local":"25 Iroda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"Chair"}]},{"name":"Rajneesh","age":34,"address":{"local":"22 Alaknanda","city":"Dehradun","state":"UK"},"orders":[{"id":1,"name":"Fan"}]}]



Solution:
function updateUsers(users, userObject, item) {
  //write your code here
  let userExist = false;
  let userIndex = -1;
  for (x in users) {
    userExist = users[x].name === userObject.name ? true : false;
    userIndex = users[x].name === userObject.name ? x : -1;
  }

  if (userExist) {
    if (users[userIndex].orders) {
      let alreadyOrdered = false;
      for (y in users[userIndex].orders) {
        alreadyOrdered =
          users[userIndex].orders[y].name === item ? true : false;
        if (alreadyOrdered) break;
      }

      if (alreadyOrdered) {
        return { msg: "Already ordered!" };
      }

      users[userIndex].orders.push({
        id: users[userIndex].orders.length + 1,
        name: item,
      });
    } else {
      users[userIndex].orders = [{ id: 1, name: item }];
    }
  } else {
    if (item) {
      userObject.orders = [{ id: 1, name: item }];
    }
    users.push(userObject);
  }
  return users;
}