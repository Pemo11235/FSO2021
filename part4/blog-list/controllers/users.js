const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const {request, response} = require("express");
const {next} = require("lodash/seq");
const Blog = require("../models/blog");
const {model} = require("mongoose");

userRouter.post('/', async (request, response) => {
    const body = request.body;

    const saltRounds = 10;

    if ((body.password === null || undefined) || (body.username === null || undefined)) {
        response.status(400).json({error: 'content missing'})
    } else {
        if ((body.password.length < 4) || (body.username.length < 4)) {
            response.status(400).json({error: 'username or password length is too short'})
        } else {
            const passwordHash = await bcrypt.hash(body.password, saltRounds);

            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })

            try {
                const savedUser = await user.save()
                response.json(savedUser)
            } catch (e){
                response.status(400).json({error: e.message})
            }

        }
    }

})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(u => u.toJSON()));
})

userRouter.put('/:id', async (request,response) => {
    let userToUpdate = request.body;
    const userObj = new User(userToUpdate).toJSON();
    delete userObj.id;
    const updatedUser = await User.findByIdAndUpdate(request.params.id , userObj, {new: true});
    response.json(updatedUser);

})
module.exports = userRouter