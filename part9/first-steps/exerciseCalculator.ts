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

const weeklyExercise: Array<number> = [3, 0, 2, 4.5, 0, 3, 1]

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

console.log(calculateExercises(weeklyExercise, 2))
