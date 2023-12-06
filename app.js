const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);


//all users
app.get("/", (req, res) => {
  res.send(users);
});

//first user
app.get("/first", (req, res) => {
    res.send(users[0]);
});

//last user
app.get("/last", (req, res) => {
    const lastuser = users[users.length - 1];
    res.send(lastuser);
  });

 app.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el.id === parseInt(id));
  res.send(user);
});
// get user by city
app.get("/city/:city", (req, res) => {
    let city = req.params.city;
    let usersInCity = users.filter((el) => el.address && el.address.city === city);
    res.send(usersInCity);
  });
  
  //get user by company
  app.get("/company/:company", (req, res) => {
    let company = req.params.company;
    let usersInCompany = users.filter((el) => el.company && el.company.name === company);
    res.send(usersInCompany);
  })

  // get street by id
  app.get("/:id/street", (req, res) => {
    let id = req.params.id;
    let user = users.find((el) => el.id === parseInt(id));
    res.send(user.address.street);
  });

  // add new user
app.post("/adduser", (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
  
    let newUser = { name, age };
    users.push(newUser);
  
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send({ success: true });
  });
  // update user
  app.put("/usersupdate/:id", (req, res) => {
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
  