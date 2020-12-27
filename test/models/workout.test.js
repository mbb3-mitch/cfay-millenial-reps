const _db = require("../../app/models");
const Exercise = _db.exercises;
const Set = _db.sets;
const Workout = _db.workouts;

const {setupDB} = require('../test-setup');


describe('insert', () => {

    setupDB()

    test('Should create an exercise', async () => {
        const expected_name = 'Push Ups'

        // Create a Exercise
        const exercise = new Exercise({
            name: expected_name,
        });

        // Save Exercise in the database
        await exercise.save()
        const foundExercise = await Exercise.findOne({name: expected_name})
        expect(foundExercise.name).toBe(expected_name)
    })

    test('Should create a workout', async () => {
        const expected_name = 'Push Ups'

        // Create a Exercise
        const exercise = new Exercise({
            name: expected_name,
        });

        // Save Exercise in the database
        await exercise.save()
        const foundExercise = await Exercise.findOne({name: expected_name})
        expect(foundExercise.name).toBe(expected_name)


        // Create a workout
        const expected_workout_name = 'My good old workout';
        const workout = new Workout({
            name: expected_workout_name,
            duration: 600,
        });

        // Save Exercise in the database
        await workout.save()
        const foundWorkout = await Workout.findOne({name: expected_workout_name})
        expect(foundWorkout.name).toBe(expected_workout_name)
    })

    test('Should create an exercise set', async () => {
        const expected_name = 'Push Ups'

        // Create a Exercise
        const exercise = new Exercise({
            name: expected_name,
        });

        // Save Exercise in the database
        await exercise.save()
        const foundExercise = await Exercise.findOne({name: expected_name})
        expect(foundExercise.name).toBe(expected_name)

        // Create a workout
        const expected_workout_name = 'My good old workout';
        const workout = new Workout({
            name: expected_workout_name,
            duration: 600,
        });

        // Save Exercise in the database
        await workout.save()
        const foundWorkout = await Workout.findOne({name: expected_workout_name})
        expect(foundWorkout.name).toBe(expected_workout_name)

        // Create an Exercise Set
        const set = new Set({
            exercise_id: foundExercise.id,
            reps: 25,
            workout_id: foundWorkout.id
        });

        // Save Set in the database
        await set.save()
        const foundSet = await Set.findOne({exercise_id: foundExercise.id})
        expect(foundSet.reps).toBe(25)

    })

});

