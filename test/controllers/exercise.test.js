const request = require('supertest');

const {startServer, app} = require('../../app/server/server')
startServer(true)

const {setupDB} = require('../test-setup');

const db = require("../../app/models");
const Exercise = db.exercises;
const Set = db.sets;
const Workout = db.workouts;


describe('controllers-exercise-controller', () => {
    setupDB()

    beforeEach(async () => {
        const expected_name = 'Handstand'
        // Create a Exercise
        const exercise = new Exercise({
            name: expected_name,
        });

        // Save Exercise in the database
        await exercise.save()
        const foundExercise = await Exercise.findOne({name: expected_name})

        // Create an Exercise Set
        const set = new Set({
            exercise_id: foundExercise.id,
            duration: 25,
            reps: 0,
        });

        // Save Set in the database
        await set.save()
        const foundSet = await Set.findOne({exercise_id: foundExercise.id})

        // Create a workout
        const expected_workout_name = 'Handstand Workout';
        const workout = new Workout({
            name: expected_workout_name,
            sets: foundSet.id,
            duration: 600,
        });

        // Save Exercise in the database
        await workout.save()
    })

    test('Should create an exercise', async () => {
        const expected_name = 'Push Ups';
        const res = await request(app)
            .post('/api/exercises')
            .send({
                name: expected_name,
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })
    test('Should get all exercises', async () => {

        const res = await request(app)
            .get('/api/exercises')

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toBeGreaterThan(0)

    })
    test('Should get an exercise with ID', async () => {
        const expected_name = 'Handstand'
        const foundExercise = await Exercise.findOne({name: expected_name})

        const res = await request(app)
            .get(`/api/exercises/${foundExercise.id}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toBe(expected_name)

    })
    test('Should update an exercise with ID', async () => {
        const expected_name = 'Handstand'
        const foundExercise = await Exercise.findOne({name: expected_name})

        const res = await request(app)
            .put(`/api/exercises/${foundExercise.id}`)
            .send({
                name: 'handstand updated'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe("Exercise was updated successfully.")

    })
    test('Should update an exercise with ID', async () => {
        const expected_name = 'Handstand'
        const foundExercise = await Exercise.findOne({name: expected_name})

        const res = await request(app)
            .delete(`/api/exercises/${foundExercise.id}`)


        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe("Exercise was deleted successfully!")
    })
    test('Should delete all exercises', async () => {
        const expectedDeletedCount = 1;

        const res = await request(app)
            .delete(`/api/exercises`)


        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe(`${expectedDeletedCount} Exercises were deleted successfully!`)
    })


    test('Should create a set', async () => {
        const foundExercise = await Exercise.findOne({name: 'Handstand'})

        const res = await request(app)
            .post('/api/sets')
            .send({
                exercise_id: foundExercise.id,
                reps: 0,
                duration: 10
            })
        expect(res.statusCode).toEqual(200)
        const {exercise_id, reps, duration} = res.body
        expect(exercise_id).toEqual(foundExercise.id)
        expect(reps).toEqual(0)
        expect(duration).toEqual(10)
    })
    test('Should get all sets', async () => {

        let res = await request(app)
            .get('/api/sets')

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toBeGreaterThan(0)

        const foundExercise = await Exercise.findOne({name: 'Handstand'})
        res = await request(app)
            .get(`/api/sets?exercise_id=${foundExercise.id}`)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toEqual(1)
    })
    test('Should get an set with ID', async () => {
        const foundSets = await Set.find({});
        const foundSet = foundSets[0];


        const res = await request(app)
            .get(`/api/sets/${foundSet.id}`)

        expect(res.statusCode).toEqual(200)
        const {exercise_id, reps, duration} = res.body
        expect(exercise_id).toEqual(foundSet.exercise_id.toJSON())
        expect(reps).toEqual(0)
        expect(duration).toEqual(25)

    })
    test('Should update a set with ID', async () => {
        const foundSets = await Set.find({});
        const foundSet = foundSets[0];


        const res = await request(app)
            .put(`/api/sets/${foundSet.id}`)
            .send({reps: 22})

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe("Set was updated successfully.")


    })
    test('Should delete a set with ID', async () => {
        const foundSets = await Set.find({});
        const foundSet = foundSets[0];


        const res = await request(app)
            .delete(`/api/sets/${foundSet.id}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe("Set was deleted successfully!")
    })
    test('Should delete all sets', async () => {
        const expectedDeletedCount = 1;

        const res = await request(app)
            .delete(`/api/sets`)


        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe(`${expectedDeletedCount} Sets were deleted successfully!`)
    })

    test('Should create an empty workout', async () => {
        const expected_duration = 100;
        let res = await request(app)
            .post('/api/workouts')
            .send({
                name: 'Test workout',
                sets: [],
                duration: expected_duration
            })
        expect(res.statusCode).toEqual(200)
        let {name, sets, duration} = res.body
        expect(name).toBeTruthy()
        expect(sets).toEqual([])
        expect(duration).toEqual(expected_duration)


    })
    test('Should create a workout with a set', async () => {

        const expected_duration = 100;
        const foundExercise = await Exercise.findOne({name: 'Handstand'})
        let res = await request(app)
            .post('/api/sets')
            .send({
                exercise_id: foundExercise.id,
                reps: 0,
                duration: 10
            })
        expect(res.statusCode).toEqual(200)

        let {id: set_id} = res.body
        res = await request(app)
            .post('/api/workouts')
            .send({
                name: 'Test workout',
                sets: [set_id],
                duration: expected_duration
            })
        expect(res.statusCode).toEqual(200)
        let {name, sets, duration} = res.body
        expect(name).toBeTruthy()
        expect(sets.length).toEqual(1)
        expect(sets[0]).toEqual(set_id)
        expect(duration).toEqual(expected_duration)


    })
    test('Should get all workouts', async () => {

        let res = await request(app)
            .get('/api/workouts')

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toBeGreaterThan(0)

        const name = 'Handstand Workout';
        res = await request(app)
            .get(`/api/workouts?name=${name}`)

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body.length).toEqual(1)
    })
    test('Should get an workout with ID', async () => {
        const foundWorkouts = await Workout.find({});
        const foundWorkout = foundWorkouts[0];


        const res = await request(app)
            .get(`/api/workouts/${foundWorkout.id}`)

        expect(res.statusCode).toEqual(200)
        const {name, sets, duration} = res.body
        expect(name).toEqual(foundWorkout.name)
        expect(sets.length).toEqual(foundWorkout.sets.length)
        sets.forEach((set, index) => expect(set).toEqual(foundWorkout.sets[index].toJSON()) )
        expect(duration).toEqual(foundWorkout.duration)

    })
    test('Should update a workout with ID', async () => {
        const foundWorkouts = await Workout.find({});
        const foundWorkout = foundWorkouts[0];


        const res = await request(app)
            .put(`/api/workouts/${foundWorkout.id}`)
            .send({duration: 3245})

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe("Workout was updated successfully.")


    })
    test('Should delete a workout with ID', async () => {
        const foundWorkouts = await Workout.find({});
        const foundWorkout = foundWorkouts[0];


        const res = await request(app)
            .delete(`/api/workouts/${foundWorkout.id}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe("Workout was deleted successfully!")
    })
    test('Should delete all workouts', async () => {
        const expectedDeletedCount = 1;

        const res = await request(app)
            .delete(`/api/workouts`)


        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe(`${expectedDeletedCount} Workouts were deleted successfully!`)
    })


});
