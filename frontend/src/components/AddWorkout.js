import React, {useState} from "react";
import WorkoutDataService from "../services/WorkoutService";

const AddWorkout = () => {
    const initialWorkoutState = {
        id: null,
        name: "",
        sets: [],
        duration: 0,
    };
    const [workout, setWorkout] = useState(initialWorkoutState);
    const [submitted, setSubmitted] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setWorkout({...workout, [name]: value});
    };

    const saveWorkout = () => {
        var data = {
            name: workout.name,
            sets: workout.sets,
            duration: workout.duration,
        };

        WorkoutDataService.create(data)
            .then(response => {
                setWorkout({
                    id: response.data.id,
                    name: response.data.name,
                    sets: response.data.sets,
                    duration: response.data.duration,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newWorkout = () => {
        setWorkout(initialWorkoutState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newWorkout}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={workout.name}
                            onChange={handleInputChange}
                            name="name"
                        />

                    </div>

                    <button onClick={saveWorkout} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddWorkout;
