const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({});
    await response.json(allBlogs)

});

blogsRouter.post('/', async (request, response) => {
    let blogObj = request.body;

    if(request.body.likes === undefined || null ){
        blogObj = {...blogObj, likes: 0}
    }

    const blog = new Blog(blogObj)
    const result = await blog.save()
    response.status(201).json(result)

});

module.exports = blogsRouter;
