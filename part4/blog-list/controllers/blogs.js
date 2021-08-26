const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({});
    await response.json(allBlogs)

});

blogsRouter.post('/', async (request, response) => {
    let blogObj = request.body;

    if ((blogObj.title === undefined || null) && (blogObj.url === undefined || null)) {
        response.status(400).end()
    } else {

        if (request.body.likes === undefined || null) {
            blogObj = {...blogObj, likes: 0}
        }

        const blog = new Blog(blogObj)
        const result = await blog.save()
        response.status(201).json(result)
    }

});


blogsRouter.delete('/:id', async (request, response) => {
    let idToDelete = request.params.id;
    console.log('body>>>>>',idToDelete)
    const result = await Blog.findByIdAndRemove(idToDelete);
    response.status(204).end();

})

module.exports = blogsRouter;
