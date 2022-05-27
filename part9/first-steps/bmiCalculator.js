"use strict";
exports.__esModule = true;
var calculateBmi = function (_a) {
    var height = _a.height, weight = _a.weight;
    var heightInMeters = cmToMeters(height);
    var bmi = weight / Math.pow(heightInMeters, 2);
    if (bmi < 16.0)
        return 'Underweight (Severe thinness)';
    if (bmi >= 16.0 && bmi <= 16.9)
        return 'Underweight (Moderate thinness)';
    if (bmi >= 17.0 && bmi <= 18.4)
        return 'Underweight (Mild thinness)';
    if (bmi >= 18.5 && bmi <= 24.9)
        return 'Normal range';
    if (bmi >= 25.0 && bmi <= 29.9)
        return 'Overweight (Pre-obese)';
    if (bmi >= 30.0 && bmi <= 34.9)
        return 'Obese (Class I)';
    if (bmi >= 35.0 && bmi <= 39.9)
        return 'Obese (Class II)';
    if (bmi >= 40.0)
        return 'Obese (Class III)';
    return 'Error !';
};
var cmToMeters = function (cm) { return cm / 100; };
// const execute = (): void => {
//   try {
//     const { value1: height, value2: weight } = parseNumberArgs(process.argv, 2)
//     const results: BmiResults = calculateBmi({
//       height,
//       weight,
//     })
//     console.log(
//       `\nBMI for height ${height} cm and weight ${weight} kg: \t ${results}\n`
//     )
//   } catch (error: unknown) {
//     let errorMessage = '\nSomething went wrong !'
//     if (error instanceof Error) errorMessage += `\nError:  ${error.message}\n`
//     console.error(errorMessage)
//   }
// }
// execute()
exports["default"] = calculateBmi;
