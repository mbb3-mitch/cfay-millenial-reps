import React, { useState } from "react";
import ExerciseDataService from "../services/ExerciseService";

const AddExercise = () => {
  const initialExerciseState = {
    id: null,
    name: "",
    reps: "",
  };
  const [exercise, setExercise] = useState(initialExerciseState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setExercise({ ...exercise, [name]: value });
  };

  const saveExercise = () => {
    var data = {
      name: exercise.name,
      reps: exercise.reps
    };

    ExerciseDataService.create(data)
      .then(response => {
        setExercise({
          id: response.data.id,
          name: response.data.name,
          reps: response.data.reps,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newExercise = () => {
    setExercise(initialExerciseState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newExercise}>
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
              value={exercise.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reps">Reps</label>
            <input
              type="text"
              className="form-control"
              id="reps"
              required
              value={exercise.reps}
              onChange={handleInputChange}
              name="reps"
            />
          </div>

          <button onClick={saveExercise} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExercise;
