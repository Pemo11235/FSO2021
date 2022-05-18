const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { default: mongoose } = require('mongoose')
const Books = require('./models/Book')
const Authors = require('./models/Author')
const Book = require('./models/Book')
const Author = require('./models/Author')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const JWT_SECRET = 'dummykey'

const MONGODB_URI =
  'mongodb+srv://admin:a@cluster0.xmxno.mongodb.net/library?retryWrites=true&w=majority'

console.log('Connecting to ', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((e) => {
    console.error('Error connectiong to MongoDB :\n\t', e.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]
    me: User
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Books.collection.countDocuments(),
    authorCount: async () => Authors.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Books.find({})
      if (args.author && args.genre) {
        const author = await Authors.findOne({ name: args.author })
        const books = await Books.find({
          author,
          genres: { $in: [args.genre] },
        })
        return books
      }
      if (args.author) {
        const author = await Authors.findOne({ name: args.author })
        const books = await Books.find({ author })
        return books
      }
      if (args.genre) {
        const books = await Books.find({ genres: { $in: [args.genre] } })
        return books
      }
    },
    allAuthors: async () => Authors.find({}),
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: (root) => Books.find({ name: root.name }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const authorExist = await Authors.findOne({ name: args.author })
      const currentUser = context.currentUser
      let newAuthor
      console.log(currentUser)

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (!authorExist) {
        newAuthor = new Author({ name: args.author, born: null })
        if (newAuthor.name.length < 4) {
          throw new UserInputError('Author name too short ! Min 4 ')
        }
        await newAuthor.save()
      }
      const book = new Book({
        ...args,
        author: authorExist ? authorExist : newAuthor,
      })

      if (book.title.length < 2) {
        throw new UserInputError('Book title too short ! Min 2')
      }
      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
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
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = await jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
