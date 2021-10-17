const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require('bcrypt')


let testUserId;

const loginWithTestUser = async () => {
  const credentials = {
    username: helper.user.username,
    password: helper.user.password,
  };
  const response = await api
    .post("/api/login")
    .send(credentials)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  return response.body.token;
};
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash(helper.user.password, 10);
  let user = new User({
    username: helper.user.username,
    name: helper.user.username,
    passwordHash: passwordHash,
  });

  user = await user.save();

  for (let blog of helper.initialBlogs) {
    let newBlog = new Blog(blog);
    newBlog.user = user.toJSON().id.toString();
    newBlog = await newBlog.save();
    user.blogs.push(newBlog.toJSON().id.toString());
  }
  user = await user.save();
  testUserId = user.toJSON().id;
});

describe("check when there are some blogs", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs/");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test("check the unique identifier propriety", async () => {
    const response = await api.get("/api/blogs");

    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  }, 10000);
});

describe("posting a blog", () => {
  test("successful POST of a Blog", async () => {
    const token = await loginWithTestUser();
    const blogToPost = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    };

    await api
      .post("/api/blogs/")
      .send(blogToPost)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogAtTheEnd = await helper.blogsInDB();
    expect(blogAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);
  }, 10000);

  test("set default value for likes if miss", async () => {
    const token = await loginWithTestUser();

    const blogWithoutLikes = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(blogWithoutLikes);

    const blogAtTheEnd = await helper.blogsInDB();

    for (const blog of blogAtTheEnd) {
      expect(blog.likes).toBeDefined();
    }
  }, 10000);

  test("blog without title and url return 400 bad request", async () => {
    const token = await loginWithTestUser();
    const blogWithoutTitleAndUrl = {
      author: "Jhon Doe",
      likes: "5",
    };

    await api
      .post("/api/blogs/")
      .set("Authorization", `bearer ${token}`)
      .send(blogWithoutTitleAndUrl)
      .expect(400);

    const blogAtTheEnd = await helper.blogsInDB();
    expect(blogAtTheEnd).toHaveLength(helper.initialBlogs.length);
  }, 10000);
});

describe("deletion of a blog", () => {
  test("check if deletion return 204", async () => {
    const token = await loginWithTestUser();
    const blogAtStart = await helper.blogsInDB();
    const blogToDelete = blogAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(blogAtStart.length - 1);
  }, 10000);
});

describe("updating of a blog", () => {
  test("check if update on likes=100 succeed ", async () => {
    const token = await loginWithTestUser();
    const blogAtStart = await helper.blogsInDB();
    let blogToUpdate = blogAtStart[0].toJSON();
    blogToUpdate.likes = 100;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${token}`)
      .send(blogToUpdate);

    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd[0].likes).toEqual(100);
  }, 10000);
});
afterAll(() => {
  mongoose.connection.close();
});
