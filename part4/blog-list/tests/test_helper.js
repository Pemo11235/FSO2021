const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
]

const blogsInDB = async () => {
    return Blog.find({})
}

const isLikesNotSet = async (blog) => {
    return (!blog.likes)
}

module.exports = {
    initialBlogs,
    blogsInDB,
    isLikesNotSet,
}