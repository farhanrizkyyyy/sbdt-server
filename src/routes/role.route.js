const roles =  require("express").Router();

const rolesController = require("../controllers/role.controller.js")

roles.get("/", rolesController.readRole)
roles.post("/", rolesController.createRole)
roles.get("/:id", rolesController.getRoleById)
roles.put("/:id", rolesController.editRole)
roles.delete("/:id", rolesController.deleteRole)

module.exports = roles