const express = require("express");
const userRouter = express.Router();
const {
  getUserById,
  getUser,
  getUsers,
  getUserByEmail,
  createUser,
} = require("../db/users");

const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const results = await getUsers();
    res.send(results);
  } catch (err) {
    res.send({ err, message: "something went wrong" });
  }
});

// {baseUrl}/users/id
// userRouter.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await getUserById(id);
//     res.send(result);
//   } catch (err) {
//     res.send({ err, message: "something went wrong" });
//   }
// });

// {baseUrl}/users/me
userRouter.get("/me", (req, res) => {
  res.send("here is your account info");
});

// POST request to {baseUrl}/api/users/register
userRouter.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email) {
    res.send("Email not provided!");
    return;
  }
  if (!password) {
    res.send("Password not provided!");
    return;
    // do something here
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.send("user already registered with that email");
      return;
    }
    const result = await createUser(req.body);
    if (result) {
    } else {
      res.send("error registering, try later");
      return;
    }
    console.log(result);
    res.send("success");
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  console.log(req.body.email);
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("missing credentials - must supply both email and password");
    return;
  }
  try {
    const result = await getUser(req.body);
    console.log(result);
    res.send("You logged in successfully!");
  } catch (err) {
    res.send("something went wrong");
  }
});

userRouter.get("/test", async (req, res, next) => {
  try {
    resjson();
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
