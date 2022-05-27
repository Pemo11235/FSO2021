"use strict";
exports.__esModule = true;
var ratings = {
    1: 'You can do better',
    2: 'Not too bad',
    3: 'Excellent'
};
var calculateExercises = function (exerciseHours, target) {
    var periodLength = exerciseHours.length;
    var trainingDays = exerciseHours.reduce(function (acc, curr) { return acc + (curr > 0 ? 1 : 0); }, 0);
    var success = periodLength === trainingDays;
    var rating = calculateRating(periodLength, trainingDays, success);
    var ratingDescription = ratings[rating];
    var average = getAverageExerciseHours(exerciseHours);
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};
var calculateRating = function (period, trainingDays, success) {
    if (success)
        return 3;
    if (period > trainingDays && trainingDays > 3)
        return 2;
    return 1;
};
var getAverageExerciseHours = function (exerciseHours) {
    var sum = exerciseHours.reduce(function (acc, curr) { return acc + curr; }, 0);
    return sum / exerciseHours.length;
};
// const printResults = (exerciseResult: ExerciseResult): void => {
//   const title = `\nYour exercise results:\n`
//   let content = ''
//   for (const [key, value] of Object.entries(exerciseResult)) {
//     content += `\t${[camelCaseToSentenceCase(key)]}: ${value}\n`
//   }
//   console.log(title + content)
// }
// const execute = (): void => {
//   try {
//     const argsAccepted = process.argv.length - 2
//     const minArgs = 2
//     const exerciseHoursObj = parseNumberArgs(
//       process.argv,
//       argsAccepted,
//       minArgs
//     )
//     const target = Number(exerciseHoursObj.value1)
//     delete exerciseHoursObj.value1
//     const exerciseHoursArray = Array.from(Object.values(exerciseHoursObj))
//     const exerciseResult = calculateExercises(exerciseHoursArray, target)
//     printResults(exerciseResult)
//   } catch (error) {
//     let errorMessage = '\nerrorSomething went wrong !'
//     if (error instanceof Error) errorMessage += `\nError:  ${error.message}\n`
//     console.error(errorMessage)
//   }
// }
// const camelCaseToSentenceCase = (str: string): string => {
// return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
// return str.toUpperCase()
// })
// }
// execute()
exports["default"] = calculateExercises;
