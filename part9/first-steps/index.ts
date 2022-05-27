import express = require('express')
import bodyParser = require('body-parser')
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

interface ExerciseInput {
  daily_exercises: Array<number>
  target: number
}

const app = express()

app.use(bodyParser.json())

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: ExerciseInput = req.body
  if (!daily_exercises || !target) {
    res.status(400).send(JSON.stringify({ error: 'parameters missing' }))
  } else {
    if (!Array.isArray(daily_exercises) || isNaN(target)) {
      res.status(400).send(JSON.stringify({ error: 'malformatted parameters' }))
    } else {
      const results = calculateExercises(daily_exercises, target)
      const response = JSON.stringify(results)
      res.status(200).send(response)
    }
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
