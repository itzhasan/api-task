const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);


app.get("/", (req, res) => {
  res.send("Hello world");
});

//all users
app.get("/users", (req, res) => {

  let {city, first ,last} = req.query.city


  if(city){
    let usersInCity = users.filter((el) => el.address && el.address.city === city);
    res.send(usersInCity);
  }

  if(first){
    res.send(users[0]);
  }
  

  if(last){
    const lastuser = users[users.length - 1];
    res.send(lastuser);

  }
  
  res.send(users);
});



 app.get("users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === parseInt(id));
  res.send(user);
});

  //get user by company
  app.get("users/company/:company", (req, res) => {
    let company = req.params.company;
    let usersInCompany = users.filter((el) => el.company && el.company.name === company);
    res.send(usersInCompany);
  })

  // get street by id
  app.get("users/:id/street", (req, res) => {
    let id = req.params.id;
    let user = users.find((el) => el.id === parseInt(id));
    res.send(user.address.street);
  });

  // add new user
app.post("users/adduser", (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
  
    let newUser = { name, age };
    users.push(newUser);
  
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send({ success: true });
  });
  // update user
  app.put("users/usersupdate/:id", (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let age = req.body.age;
  
    let user = users.find((el) => el.id === parseInt(id));
    user.name = name;
    user.age = age;
  
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send({ success: true });
  });


  // delete user
  app.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex((el) => el.id === parseInt(id));
    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFileSync("./users.json", JSON.stringify(users));
      res.send({ success: true });
    }
  });
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  