import React, {useEffect, useState} from "react";
import SetDataService from "../services/SetService";
import ExerciseDataService from "../services/ExerciseService";

const AddSet = (props) => {

    const initialSetState = {
        id: null,
        exercise_id: "",
        reps: 0,
        duration: 0,
    };
    const [set, setSet] = useState(initialSetState);
    const [submitted, setSubmitted] = useState(false);
    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        ExerciseDataService.getAll()
            .then(response => {
                if (set.exercise_id) {
                    console.log(set);
                    return;
                }
                setExercises(response.data);
                console.log(response.data[0].id)
                setSet(set => ({...set, exercise_id: response.data[0].id}));
            })
            .catch(e => {
                console.log(e);
            });
    }, [set]);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setSet({...set, [name]: value});
        console.log(set);
    };

    const saveSet = () => {
        const data = {
            exercise_id: set.exercise_id,
            reps: set.reps,
            duration: set.duration,
        };

        SetDataService.create(data)
            .then(response => {
                setSet({
                    id: response.data.id,
                    exercise_id: response.data.exercise_id,
                    reps: response.data.reps,
                    duration: response.data.duration,
                });
                setSubmitted(true);
                if (props.handleNewSetAdded){
                    props.handleNewSetAdded()
                }            })
            .catch(e => {
                console.log(e);
            });
    };

    const newSet = () => {
        setSet(initialSetState);
        setSubmitted(false);
    };

    return (
        <div className="col-md-6 mt-5">

            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newSet}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <h2>Add a set</h2>
                        <label htmlFor="exercise_id">Exercise</label>
                        <select
                            className="form-control"
                            id="exercise_id"
                            required
                            value={set.exercise_id}
                            onChange={handleInputChange}
                            name="exercise_id"
                        >
                            {exercises &&
                            exercises.map((exercise, index) => (
                                <option value={exercise.id} key={index}>{exercise.name}</option>
                            ))}
                        </select>
                        <label htmlFor="reps">Reps</label>
                        <input
                            type="text"
                            className="form-control"
                            id="reps"
                            required
                            value={set.reps}
                            onChange={handleInputChange}
                            name="reps"
                        />
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            required
                            value={set.duration}
                            onChange={handleInputChange}
                            name="duration"
                        />
                    </div>


                    <button onClick={saveSet} className="btn btn-success">
                        Create
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddSet;
