const posts = require("express").Router();

const postsController = require("../controllers/post.controller.js");

posts.get("/", postsController.readPost)
posts.post("/", postsController.createPost)
posts.get('/:userId', postsController.getPostsByUserId)
posts.get("/:id", postsController.getPostById)
posts.put("/:id", postsController.editPost)
posts.delete("/:id", postsController.deletePost)

module.exports = posts