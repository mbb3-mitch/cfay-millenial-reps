import React, {useCallback, useEffect, useState} from "react";
import SetDataService from "../services/SetService";
import {Link} from "react-router-dom";
import AddSet from "./AddSet";

const SetsList = (props) => {
    const [sets, setSets] = useState([]);
    const [currentSet, setCurrentSet] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [addSetForm, setAddSetForm] = useState(false);

    const retrieveSets = useCallback(() => {
        console.log(props)
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
    },[props]);
    useEffect(() => {
        retrieveSets();
    }, [retrieveSets]);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
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

    const handleNewSetAdded = ()=>{
        retrieveSets()
        setAddSetForm(false)
    }

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
                    {sets && sets.length ?
                        (sets.map((set, index) => (
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
                        ))) : (
                            <li className="list-group-item">No sets have been created.</li>
                        )}
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
                        {sets && sets.length ? <p>Please click on a Set...</p> : false}
                    </div>
                )}
            </div>
            {!addSetForm && props.workoutID && props.workoutActive &&
            <button onClick={() => {
                setAddSetForm(true)
            }} className="btn btn-success mt-3">
                Create set
            </button>
            }
            {addSetForm &&
            <div className="col-md-12">
                <AddSet handleNewSetAdded={handleNewSetAdded}/>
            </div>
            }
        </div>
    );
};

export default SetsList;
