const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app)
const  mongoose = require('mongoose')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({username: 'root' , passwordHash})

        await user.save()
    }    )

    test('creation succeed with one fresh user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Pemo',
            name: 'Matteo',
            password: 'fullstack',
        }

        await api
            .post('/api/users/')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await  helper.usersInDb()
        expect(userAtEnd).toHaveLength(usersAtStart.length +1)

        const usernames = userAtEnd.map(u =>  u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'passw',
        }

        const result = await api
            .post('/api/users/')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(result)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    },10000)
})