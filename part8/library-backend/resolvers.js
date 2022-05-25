const { ApolloServer, UserInputError } = require('apollo-server')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const { default: mongoose } = require('mongoose')
const pubsub = new PubSub()

const JWT_SECRET = 'dummykey'

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre)
        return await Book.find({}).populate('author')
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const booksGenres = await Book.find({
          author,
          genres: { $in: [args.genre] },
        }).populate('author')
        return books
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
          name: author.name,
        }).populate('author')
        return books
      }
      if (args.genre) {
        const books = await Book.find({
          genres: { $in: [args.genre] },
        }).populate('author')
        return books
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})

      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author.id,
        }
      })

      return authorsObject
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let book
      try {
        let author = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError('Not authenticated !')
        }

        if (author) {
          book = new Book({ ...args, author: author._id })
          author.books = author.books.concat(book._id)

          await book.save()
          await author.save()
        }

        if (!author) {
          const _id = mongoose.Types.ObjectId()
          book = new Book({ ...args, author: _id })

          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
            _id,
            books: [book._id],
          })

          await author.save()
          await book.save()
        }
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const authorToUpdate = await Author.findOne({ name: args.name })
      authorToUpdate.born = args.setBornTo
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        await authorToUpdate.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
      return authorToUpdate
    },
    createUser: async (root, args) => {
      const newUser = new User({ username: args.username })

      try {
        await newUser.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'dummy') {
        throw new UserInputError('Wrong credentials !')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']) },
  },
}

module.exports = resolvers
