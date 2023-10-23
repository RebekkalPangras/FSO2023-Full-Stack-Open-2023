interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): ExerciseResult => {
    const periodLength = hours.length;
    const trainingDays = hours.filter((hour) => hour > 0).length;
    const totalHours = hours.reduce((acc, hour) => acc + hour, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating = 1;
    let ratingDescription = 'not too bad but could be better';

    if (average >= target) {
        rating = 3;
        ratingDescription = 'well done, you reached your target!';
    } else if (average >= target / 2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

// Example usage
const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const targetHours = 2;

const result = calculateExercises(exerciseHours, targetHours);
console.log(result);
