import React, {useEffect, useState} from "react";
import WorkoutDataService from "../services/WorkoutService";
import moment from 'moment';
import SetsList from "./SetList";

const Workout = props => {
    const initialWorkoutState = null;
    const [currentWorkout, setCurrentWorkout] = useState(initialWorkoutState);
    const [editWorkout, setEditWorkout] = useState(false);
    const [message, setMessage] = useState("");

    const getWorkout = id => {
        WorkoutDataService.get(id)
            .then(response => {
                setCurrentWorkout(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getWorkout(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log(name, value)
        setCurrentWorkout({...currentWorkout, [name]: value});
    };
    const handleInputCheckbox = event => {
        const {name, checked} = event.target;
        setCurrentWorkout({...currentWorkout, [name]: checked});
    };


    const updateWorkout = () => {
        WorkoutDataService.update(currentWorkout.id, currentWorkout)
            .then(response => {
                console.log(response.data);
                setMessage("The workout was updated successfully!");
                setEditWorkout(false)
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteWorkout = () => {
        WorkoutDataService.remove(currentWorkout.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/workouts");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const toggleEditWorkout = () =>{
        setEditWorkout(true);
        setMessage('');
    }

    return (
        <div >
            {currentWorkout ? (
                <div className="text-center">
                    <div className="workout__title d-inline">
                        <h1>{currentWorkout.name}</h1>
                        { editWorkout ? ( <button
                            type="submit"
                            className="badge badge-success mr-2 d-inline-block"
                            onClick={updateWorkout}
                        >
                            Update
                        </button>): ( <button
                            className="badge badge-warning mr-2 d-inline"
                            onClick={toggleEditWorkout}
                        >
                            Edit
                        </button>)}
                        <button className="badge badge-danger mr-2 d-inline" onClick={deleteWorkout}>
                            Delete
                        </button>
                        <p className="mr-2">{message}</p>
                    </div>
                    <div className="workout__body col-md-8 m-auto">
                        {editWorkout ? (
                            <div className="">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={currentWorkout.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="active">Active</label> {" "}
                                        <input
                                            type="checkbox"
                                            id="active"
                                            name="active"
                                            checked={currentWorkout.active}
                                            onChange={handleInputCheckbox}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="start">Start</label> {" "}
                                        <input
                                            type="datetime-local"
                                            className="form-control"

                                            id="start"
                                            name="start"
                                            value={moment(currentWorkout.start).format(moment.HTML5_FMT.DATETIME_LOCAL)}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {!currentWorkout.active &&
                                    <div className="form-group">
                                        <label htmlFor="end">End</label> {" "}
                                        <input
                                            type="datetime-local"
                                            id="end"
                                            className="form-control"
                                            name="end"
                                            value={moment(currentWorkout.end).format(moment.HTML5_FMT.DATETIME_LOCAL)}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    }
                                </form>

                            </div>
                        ) : (
                            <div className="text-left">

                                <div>
                                    <strong>Active:</strong> <input
                                    type="checkbox"
                                    id="active"
                                    name="active"
                                    checked={currentWorkout.active}
                                    readOnly={true}
                                />
                                </div>
                                <div>
                                    <strong>Start:</strong> {" "}{currentWorkout.start}
                                </div>
                                <div>
                                    <strong>End:</strong> {" "}{currentWorkout.end}
                                </div>

                            </div>)
                        }
                    </div>

                    <div className="workout__set-list mt-5">
                        <SetsList workoutID={currentWorkout.id} workoutActive={currentWorkout.active}/>
                    </div>


                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Workout...</p>
                </div>
            )}
        </div>
    );
};

export default Workout;
