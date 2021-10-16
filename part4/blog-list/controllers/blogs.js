const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const {request, response} = require("express");
const User = require("../models/user");

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    await response.json(allBlogs)

});

blogsRouter.post('/', async (request, response) => {
    let blogObj = request.body;
    const user = await User.findById(blogObj.user)

    if ((blogObj.title === undefined || null) && (blogObj.url === undefined || null)) {
        response.status(400).end()
    } else {

        if (request.body.likes === undefined || null) {
            blogObj = {...blogObj, likes: 0}
        }

        const blog = new Blog(blogObj)
        const result = await blog.save()
        response.status(201).json(result)
        // const findUpdate = await  User.findByIdAndUpdate(blogObj.user, user, {new: true})
        user.blogs = user.blogs.concat(result._id)
        console.log(user)
        await user.save()
    }

});


blogsRouter.delete('/:id', async (request, response) => {
    let idToDelete = request.params.id;
    const result = await Blog.findByIdAndRemove(idToDelete);
    response.status(204).end();

});

blogsRouter.put('/:id', async (request,response) => {
    let blogToUpdate = request.body;
    const blogObj = new Blog(blogToUpdate).toJSON();
    delete blogObj.id;
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id , blogObj, {new: true});
    response.json(updatedBlog);

});

module.exports = blogsRouter;
