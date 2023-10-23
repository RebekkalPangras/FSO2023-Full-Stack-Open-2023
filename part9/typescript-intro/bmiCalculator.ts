const args = process.argv
const isNotNumber = (argument: any): boolean =>
    isNaN(Number(argument));
if (args.length < 4) {
    console.log('Usage: npm run calculateBmi <height> <weight>');
} else {
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (!isNotNumber(height) && !isNotNumber(weight)) {
        const result = calculateBmi(height, weight);
        console.log(result);
    } else {
        console.log('Invalid input. Please provide valid height and weight.');
    }
}

function calculateBmi(heightCm: number, weightKg: number): string {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM)

    if (bmi < 18.5) {
        return `Underweight (not enough weight)`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return `Normal (healthy weight)`;
    } else if (bmi >= 24.9 && bmi < 29.9) {
        return `Overweight (unhealthy weight)`;
    } else {
        return `Obese (Unhealthy weight)`;
    }
}
