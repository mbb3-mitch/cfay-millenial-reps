import React, { useState, useEffect } from "react";
import ExerciseDataService from "../services/ExerciseService";

const Exercise = props => {
  const initialExerciseState = {
    id: null,
    name: "",
    reps: "",
  };
  const [currentExercise, setCurrentExercise] = useState(initialExerciseState);
  const [message, setMessage] = useState("");

  const getExercise = id => {
    ExerciseDataService.get(id)
      .then(response => {
        setCurrentExercise(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getExercise(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentExercise({ ...currentExercise, [name]: value });
  };



    ExerciseDataService.update(currentExercise.id, data)
      .then(response => {
        setCurrentExercise({ ...currentExercise });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateExercise = () => {
    ExerciseDataService.update(currentExercise.id, currentExercise)
      .then(response => {
        console.log(response.data);
        setMessage("The exercise was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteExercise = () => {
    ExerciseDataService.remove(currentExercise.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/exercises");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentExercise ? (
        <div className="edit-form">
          <h4>Exercise</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentExercise.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reps">Reps</label>
              <input
                type="text"
                className="form-control"
                id="reps"
                name="reps"
                value={currentExercise.reps}
                onChange={handleInputChange}
              />
            </div>

          </form>


          <button className="badge badge-danger mr-2" onClick={deleteExercise}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateExercise}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Exercise...</p>
        </div>
      )}
    </div>
  );
};

export default Exercise;
