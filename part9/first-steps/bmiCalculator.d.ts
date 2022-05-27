interface BmiValues {
    height: number;
    weight: number;
}
declare type BmiResults = 'Underweight (Severe thinness)' | 'Underweight (Moderate thinness)' | 'Underweight (Mild thinness)' | 'Normal range' | 'Overweight (Pre-obese)' | 'Obese (Class I)' | 'Obese (Class II)' | 'Obese (Class III)' | 'Error !';
declare const calculateBmi: ({ height, weight }: BmiValues) => BmiResults;
export default calculateBmi;
