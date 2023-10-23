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

const exargs = process.argv
if (exargs.length < 3) {
    console.log('Usage: npm run calculateExercises <target> <hours...>');
} else {
    const target = Number(exargs[2]);
    if (!isNaN(target)) {
        const exerciseHours = exargs.slice(3).map(Number);
        if (exerciseHours.every((hour) => !isNaN(hour))) {
            const result = calculateExercises(exerciseHours, target);
            console.log(result);
        } else {
            console.log('Invalid input. Please provide valid exercise hours.');
        }
    } else {
        console.log('Invalid input. Please provide a valid target.');
    }
}
    
