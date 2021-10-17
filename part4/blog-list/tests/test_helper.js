const Blog = require('../models/blog')
const User = require('../models/user')

const user = {
    username: 'Pemo11235',
    password: 'Pemo11235'
}
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

const usersInDb = async () => {
   const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    user,
    initialBlogs,
    blogsInDB,
    isLikesNotSet,
    usersInDb,
}