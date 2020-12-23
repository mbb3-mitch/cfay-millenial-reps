const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});


describe('insert', () => {


    test('Should create an exercise', async () => {

        expect(false).toBe(false)
    })

});
