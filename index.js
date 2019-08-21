// implement your API here
const express = require("express");

const cors = require("cors");

const server = express();

const db = require("./data/db");

server.use(express.json());

server.use(cors());

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

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      user
        ? res.json({ user })
        : res.status(400).json({
            error: "User not found"
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      user
        ? res.json({ user })
        : res.status(400).json({
            error: "User not found"
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  // console.log(newUser);
  if (newUser.name && newUser.bio) {
    db.update(id, newUser)
      .then(user => {
        user
          ? res.status(200).json({ user })
          : res.status(400).json({
              error: "User not found"
            });
      })
      .catch(error => {
        res.status(500).json({
          error: "The user information could not be modified."
        });
      });
  } else {
    res.status(404).json({
      error: "Please provide name and bio for the user."
    });
  }
});

server.listen(4000, () => {
  console.log("App listening in port 4000");
});
