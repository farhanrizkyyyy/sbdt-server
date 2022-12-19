const users = require("express").Router();

const usersController = require("../controllers/user.controller.js")

users.get("/", usersController.readUser)
users.post("/", usersController.createUser)
users.get("/:id", usersController.getUserById)
users.put("/:id", usersController.editUser)
users.delete("/:id", usersController.deleteUser)

module.exports = users