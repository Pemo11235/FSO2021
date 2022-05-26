import express = require('express')

const app = express()

app.get('/ping', (_req, res) => {
  res.send('PONG')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
