import React, { useState, useEffect } from "react";
import WorkoutDataService from "../services/WorkoutService";
import { Link } from "react-router-dom";

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveWorkouts();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveWorkouts = () => {
    WorkoutDataService.getAll()
      .then(response => {
        setWorkouts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveWorkouts();
    setCurrentWorkout(null);
    setCurrentIndex(-1);
  };

  const setActiveWorkout = (workout, index) => {
    setCurrentWorkout(workout);
    setCurrentIndex(index);
  };

  const removeAllWorkouts = () => {
    WorkoutDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
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

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllWorkouts}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentWorkout ? (
          <div>
            <h4>Workout</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentWorkout.name}
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
            <br />
            <p>Please click on a Workout...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutsList;
