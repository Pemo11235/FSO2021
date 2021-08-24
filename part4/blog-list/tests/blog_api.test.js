const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api
        .get('/api/blogs/')
    expect(response.body).toHaveLength(initialBlogs.length)
}, 10000)

test('check the unique identifier propriety', async () => {
    const response = await api.get('/api/blogs');

    for (const blog of response.body) {
        expect(blog.id).toBeDefined()
    }
}, 10000)

test('successful POST of a Blog', async () => {
    const blogToPost = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    };


    await api
        .post('/api/blogs/')
        .send(blogToPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogAtTheEnd = await helper.blogsInDB();
    expect(blogAtTheEnd).toHaveLength(initialBlogs.length + 1)
}, 10000)

test('set default value for likes if miss', async () => {
    let blogWithoutLikes = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }


    await api
        .post('/api/blogs')
        .send(blogWithoutLikes)

    const blogAtTheEnd = await helper.blogsInDB();

    for (const blog of blogAtTheEnd) {
        expect(blog.likes).toBeDefined()
    }

}, 10000)
afterAll(() => {
    mongoose.connection.close()
})