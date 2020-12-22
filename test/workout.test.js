const mongoose = require('mongoose')
const _db = require("../app/models");
const Exercise = _db.exercises;
// const Set = _db.exercises;
// const Workout = _db.exercises;

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

describe('insert', () => {


    beforeAll(async () => {
        _db.mongoose
            .connect(_db.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Connected to the database!");
            })
            .catch(err => {
                console.log("Cannot connect to the database!", err);
                process.exit();
            });
    });

    afterEach(async () => {
        await removeAllCollections()
    })

    test('Should create an exercise', ()=>{
        const expected_name = 'Push Ups'
        const pushups = new Exercise({
            name: expected_name,
        })

        pushups.save().then(() => {
            Exercise.findOne({name: expected_name}).then((record) => {
                expect(record.name).toBe(expected_name)
            })
        })
    })


});

