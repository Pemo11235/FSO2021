const Blog = require('../models/blog')

const blogsInDB = async () => {
    const blogs = Blog.find({})

    return blogs
}

module.exports = {
    blogsInDB
}