import React, {useEffect, useState} from "react";
import SetDataService from "../services/SetService";
import ExerciseDataService from "../services/ExerciseService";

const Set = props => {
    const initialSetState = {
        id: null,
        exercise_id: "",
        reps: 0,
        duration: 0,
    };
    const [currentSet, setCurrentSet] = useState(initialSetState);
    const [message, setMessage] = useState("");
    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        ExerciseDataService.getAll()
            .then(response => {
                setExercises(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const getSet = id => {
        SetDataService.get(id)
            .then(response => {
                setCurrentSet(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getSet(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentSet({...currentSet, [name]: value});
    };


    const updateSet = () => {
        SetDataService.update(currentSet.id, currentSet)
            .then(response => {
                console.log(response.data);
                setMessage("The set was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteSet = () => {
        SetDataService.remove(currentSet.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/sets");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentSet ? (
                <div className="edit-form">
                    <h4>Set</h4>
                    <form>
                        <label htmlFor="exercise_id">Exercise</label>
                        <select
                            className="form-control"
                            id="exercise_id"
                            required
                            value={currentSet.exercise_id._id}
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
                            value={currentSet.reps}
                            onChange={handleInputChange}
                            name="reps"
                        />
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            required
                            value={currentSet.duration}
                            onChange={handleInputChange}
                            name="duration"
                        />

                    </form>


                    <button className="badge badge-danger mr-2" onClick={deleteSet}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateSet}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Set...</p>
                </div>
            )}
        </div>
    );
};

export default Set;
