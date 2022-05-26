import parseNumberArgs from './utils/parseArgs'
interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: RatingDescription
  target: number
  average: number
}

interface Ratings {
  [key: number]: RatingDescription
}
type RatingDescription = 'Excellent' | 'Not too bad' | 'You can do better'

const ratings: Ratings = {
  1: 'You can do better',
  2: 'Not too bad',
  3: 'Excellent',
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength: number = exerciseHours.length
  const trainingDays: number = exerciseHours.reduce(
    (acc, curr) => acc + (curr > 0 ? 1 : 0),
    0
  )
  const success: boolean = periodLength === trainingDays
  const rating: number = calculateRating(periodLength, trainingDays, success)
  const ratingDescription: RatingDescription = ratings[rating]
  const average: number = getAverageExerciseHours(exerciseHours)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

const calculateRating = (
  period: number,
  trainingDays: number,
  success: boolean
): number => {
  if (success) return 3
  if (period > trainingDays && trainingDays > 3) return 2
  return 1
}

const getAverageExerciseHours = (exerciseHours: Array<number>): number => {
  const sum = exerciseHours.reduce((acc, curr) => acc + curr, 0)
  return sum / exerciseHours.length
}

const printResults = (exerciseResult: ExerciseResult): void => {
  const title: string = `\nYour exercise results:\n`
  let content: string = ''
  for (const [key, value] of Object.entries(exerciseResult)) {
    content += `\t${[camelCaseToSentenceCase(key)]}: ${value}\n`
  }
  console.log(title + content)
}
const execute = (): void => {
  try {
    const argsAccepted = process.argv.length - 2
    const minArgs = 2
    const exerciseHoursObj = parseNumberArgs(
      process.argv,
      argsAccepted,
      minArgs
    )
    const target = Number(exerciseHoursObj.value1)
    delete exerciseHoursObj.value1

    const exerciseHoursArray = Array.from(Object.values(exerciseHoursObj))
    const exerciseResult = calculateExercises(exerciseHoursArray, target)
    printResults(exerciseResult)
  } catch (error) {
    let errorMessage = '\nSomething went wrong !'
    if (error instanceof Error) errorMessage += `\nError:  ${error.message}\n`
    console.error(errorMessage)
  }
}
const camelCaseToSentenceCase = (str: string): string => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}
// execute()

export default calculateExercises
