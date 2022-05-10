const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog');
const User = require("../models/user");
const { userExtractor } = require('../utils/middleware');


blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    await response.json(allBlogs)

});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  if (!request.token) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;

  if ((body.title === undefined || null) && (body.url === undefined || null)) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
      user: user._id,
      comments: body.comments ?? [],
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  let idToDelete = request.params.id;

  const blogToCheckBeforeRemove = await Blog.findById(idToDelete);
  const user = request.user;

  if (blogToCheckBeforeRemove.user.toString() === user._id.toString()) {
    const result = await Blog.findByIdAndRemove(idToDelete);
    response.status(204).end();
    return;
  }

  response
    .status(401)
    .json({ error: "Unauthorizated user for this operation!" })
    .end();
  return;
});

blogsRouter.put("/:id", async (request, response) => {
  let blogToUpdate = request.body;
  const blogObj = new Blog(blogToUpdate).toJSON();
  delete blogObj.id;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogObj, {
    new: true,
  });
  response.json(updatedBlog);
});

blogsRouter.put("/:id/comments", async (request, response) => {
  const commentsToPut = request.body;
  const blogID = request.params.id;

  const blogToUpdate = await Blog.findById(blogID);

  const blogObj = { comments: commentsToPut.comments, ...blogToUpdate };
  const blogJSON = new Blog(blogObj).toJSON();
  delete blogJSON.id;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogJSON,
    {
      new: true,
    }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
