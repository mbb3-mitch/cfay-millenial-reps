import React, {useEffect, useState} from "react";
import SetDataService from "../services/SetService";
import {Link} from "react-router-dom";

const SetsList = (props) => {
    const [sets, setSets] = useState([]);
    const [currentSet, setCurrentSet] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");


    useEffect(() => {
        retrieveSets();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveSets = () => {
        if (props.workoutID) {
            SetDataService.findByWorkoutID(props.workoutID)
                .then(response => {
                    setSets(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            return
        }
        SetDataService.getAll()
            .then(response => {
                setSets(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const setActiveSet = (set, index) => {
        setCurrentSet(set);
        setCurrentIndex(index);
    };


    const findByName = () => {
        SetDataService.findByWorkoutName(searchName)
            .then(response => {
                setSets(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="row text-left">
            {!props.workoutID && <div className="col-md-8">
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
            </div>}
            <div className="col-md-6">
                <h4 className="text-center">Sets List</h4>

                <ul className="list-group">
                    {sets &&
                    sets.map((set, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveSet(set, index)}
                            key={index}
                        >
                            {set.workout_id ? <div><strong>{set.workout_id.name}</strong></div> : false}
                            {<div>{set.exercise_id.name}</div>}
                            {set.reps ? <div>Reps: {set.reps}</div> : false}
                            {set.duration ? <div>Duration: {set.duration}</div> : false}
                        </li>
                    ))}
                </ul>

            </div>
            <div className="col-md-6">
                {currentSet ? (
                    <div>
                        <h4>Current Set</h4>
                        <div>
                            {currentSet.workout_id ? <div><strong>{currentSet.workout_id.name}</strong></div> : false}
                            {<div>{currentSet.exercise_id.name}</div>}
                            {currentSet.reps ? <div>Reps: {currentSet.reps}</div> : false}
                            {currentSet.duration ? <div>Duration: {currentSet.duration}</div> : false}
                        </div>


                        <Link
                            to={"/sets/" + currentSet.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Set...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SetsList;
