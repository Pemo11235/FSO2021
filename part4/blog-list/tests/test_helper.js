const Blog = require('../models/blog')

const blogsInDB = async () => {
    return Blog.find({})
}

const isLikesNotSet = async (blog) => {
    return (!blog.likes)
}

module.exports = {
    blogsInDB,
    isLikesSet: isLikesNotSet
}