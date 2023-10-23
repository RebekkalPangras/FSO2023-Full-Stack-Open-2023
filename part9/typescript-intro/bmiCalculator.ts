const calculateBmi = (heightCm: number, weightKg: number): string => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM)

    if (bmi < 18.5) {
        return `Underweight (not enough weight)`;
      } else if (bmi >= 18.5 && bmi < 24.9) {
        return `Normal (healthy weight)`;
      } else if (bmi >= 24.9 && bmi < 29.9) {
        return `Overweight (unhealthy weight)`;
      } else {
        return `Obese (Alarming weight)`;
      }
}

console.log(calculateBmi(180, 74))