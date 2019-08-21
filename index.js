// implement your API here
const express = require("express");

const server = express();

const db = require("./data/db");

server.use(express.json());

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    return res.status(400).json({
      error: "Please provide name and bio for the user"
    });
  }
  db.insert(newUser)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.listen(4000, () => {
  console.log("App listening in port 4000");
});
