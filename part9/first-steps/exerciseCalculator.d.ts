interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: RatingDescription;
    target: number;
    average: number;
}
declare type RatingDescription = 'Excellent' | 'Not too bad' | 'You can do better';
declare const calculateExercises: (exerciseHours: Array<number>, target: number) => ExerciseResult;
export default calculateExercises;
