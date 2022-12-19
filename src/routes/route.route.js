const routes =  require("express").Router();

const routesController = require("../controllers/route.controller.js")

routes.get("/", routesController.readRoute)
routes.post("/", routesController.createRoute)
routes.get("/:id", routesController.getRouteById)
routes.put("/:id", routesController.editRoute)
routes.delete("/:id", routesController.deleteRoute)

module.exports = routes