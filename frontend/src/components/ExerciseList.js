import React, { useState, useEffect } from "react";
import ExerciseDataService from "../services/ExerciseService";
import { Link } from "react-router-dom";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveExercises();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveExercises = () => {
    ExerciseDataService.getAll()
      .then(response => {
        setExercises(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveExercises();
    setCurrentExercise(null);
    setCurrentIndex(-1);
  };

  const setActiveExercise = (exercise, index) => {
    setCurrentExercise(exercise);
    setCurrentIndex(index);
  };

  const removeAllExercises = () => {
    ExerciseDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    ExerciseDataService.findByName(searchName)
      .then(response => {
        setExercises(response.data);
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
        <h4>Exercises List</h4>

        <ul className="list-group">
          {exercises &&
            exercises.map((exercise, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveExercise(exercise, index)}
                key={index}
              >
                {exercise.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentExercise ? (
          <div>
            <h4>Exercise</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentExercise.name}
            </div>



            <Link
              to={"/exercises/" + currentExercise.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Exercise...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesList;
