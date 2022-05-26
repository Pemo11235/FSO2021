import express = require('express')
import calculateBmi from './bmiCalculator'

const app = express()

app.get('/ping', (_req, res) => {
  res.send('PONG')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  const results = calculateBmi({ height, weight })

  if (results === 'Error !') {
    res.status(400).send(JSON.stringify({ error: 'malformatted parameters' }))
  } else {
    res.status(200).send(JSON.stringify({ height, weight, results }))
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
