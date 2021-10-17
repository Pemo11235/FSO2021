const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog');
const User = require("../models/user");

const getTokenFrom = request => {
    const authorization = request.get('authorization') 
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // subtring take from [7 char, end of string]
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    await response.json(allBlogs)

});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    if ((body.title === undefined || null) && (body.url === undefined || null)) {
        response.status(400).end()
    } else {

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ?? 0,
            user: user._id
        })

        const result = await blog.save()

        user.blogs = user.blogs.concat(result._id)
        await user.save()

        response.status(201).json(result)
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
