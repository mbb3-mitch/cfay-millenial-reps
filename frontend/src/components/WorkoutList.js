import React, {useEffect, useState} from "react";
import WorkoutDataService from "../services/WorkoutService";
import {Link} from "react-router-dom";

import AddWorkout from "./AddWorkout"

const WorkoutsList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [addWorkoutForm, setAddWorkoutForm] = useState(false);

    useEffect(() => {
        if (currentWorkout || workouts.length) return;
        retrieveWorkouts();
    }, [workouts, currentWorkout]);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveWorkouts = () => {
        WorkoutDataService.getAll()
            .then(response => {
                setWorkouts(response.data);
                setCurrentWorkout(response.data.find(workout => workout.active))
                setCurrentIndex(response.data.findIndex(workout => workout.active))
            })
            .catch(e => {
                console.log(e);
            });
    };


    const setActiveWorkout = (workout, index) => {
        setCurrentWorkout(workout);
        setCurrentIndex(index);
    };


    const findByName = () => {
        WorkoutDataService.findByName(searchName)
            .then(response => {
                setWorkouts(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleNewWorkoutAdded = ()=>{
        retrieveWorkouts()
        setAddWorkoutForm(false)
    }
    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Workouts List</h4>

                <ul className="list-group">
                    {workouts &&
                    workouts.map((workout, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveWorkout(workout, index)}
                            key={index}
                        >
                            {workout.name}
                        </li>
                    ))}
                </ul>
                {!addWorkoutForm &&
                <button onClick={() => {
                    setAddWorkoutForm(true)
                }} className="btn btn-success mt-3">
                    New workout
                </button>
                }
            </div>
            <div className="col-md-6">
                {currentWorkout ? (
                    <div>
                        <h4>Workout: {" "} <small>{currentWorkout.name}</small></h4>
                        <div>

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

                        </div>


                        <Link
                            to={"/workouts/" + currentWorkout.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Workout...</p>
                    </div>
                )}
            </div>
            {addWorkoutForm &&
            <div className="col-md-12">
                <AddWorkout handleNewWorkoutAdded={handleNewWorkoutAdded}/>
            </div>
            }

        </div>
    );
};

export default WorkoutsList;
