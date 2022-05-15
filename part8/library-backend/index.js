const { ApolloServer, gql } = require('apollo-server')
const { default: mongoose } = require('mongoose')
const Books = require('./models/Book')
const Authors = require('./models/Author')
const Book = require('./models/Book')
const Author = require('./models/Author')

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
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: (root) => Books.find({ name: root.name }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorExist = await Authors.findOne({ name: args.author })
      let newAuthor
      if (!authorExist) {
        newAuthor = new Author({ name: args.author, born: null })
        newAuthor.save()
      }
      const book = new Book({
        ...args,
        author: authorExist ? authorExist : newAuthor,
      })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const authorToUpdate = await Author.findOne({ name: args.name })
      authorToUpdate.born = args.setBornTo
      return authorToUpdate.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
