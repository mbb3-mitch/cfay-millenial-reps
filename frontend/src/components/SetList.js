import React, {useEffect, useState} from "react";
import SetDataService from "../services/SetService";
import {Link} from "react-router-dom";

const SetsList = () => {
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
        SetDataService.getAll()
            .then(response => {
                setSets(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveSets();
        setCurrentSet(null);
        setCurrentIndex(-1);
    };

    const setActiveSet = (set, index) => {
        setCurrentSet(set);
        setCurrentIndex(index);
    };

    const removeAllSets = () => {
        SetDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        SetDataService.findByName(searchName)
            .then(response => {
                setSets(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

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
                <h4>Sets List</h4>

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
                            {<div><strong>{set.workout_id.name}</strong></div>}
                            {<div>{set.exercise_id.name}</div>}
                            {set.reps ? <div>Reps: {set.reps}</div> : false}
                            {set.duration ? <div>Duration: {set.duration}</div> : false}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllSets}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentSet ? (
                    <div>
                        <h4>Current Set</h4>
                        <div>
                            {<div><strong>{currentSet.workout_id.name}</strong></div>}
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
