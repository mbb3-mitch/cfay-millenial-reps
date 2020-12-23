const request = require('supertest');

const {startServer, app} = require('../../app/server/server')
startServer(true)

const {setupDB} = require('../test-setup');


describe('controllers-exercise-controller', () => {
    setupDB()
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
        const expected_name = 'Push Ups';

        const res = await request(app)
            .get('/api/exercises')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveLength('name')
    })

});
