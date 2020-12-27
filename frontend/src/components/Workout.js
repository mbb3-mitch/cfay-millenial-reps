import React, { useState, useEffect } from "react";
import WorkoutDataService from "../services/WorkoutService";

const Workout = props => {
  const initialWorkoutState = {
    id: null,
    name: "",
  };
  const [currentWorkout, setCurrentWorkout] = useState(initialWorkoutState);
  const [message, setMessage] = useState("");

  const getWorkout = id => {
    WorkoutDataService.get(id)
        .then(response => {
          setCurrentWorkout(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  };

  useEffect(() => {
    getWorkout(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentWorkout({ ...currentWorkout, [name]: value });
  };


  const updateWorkout = () => {
    WorkoutDataService.update(currentWorkout.id, currentWorkout)
        .then(response => {
          console.log(response.data);
          setMessage("The workout was updated successfully!");
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

  return (
      <div>
        {currentWorkout ? (
            <div className="edit-form">
              <h4>Workout</h4>
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
              </form>


              <button className="badge badge-danger mr-2" onClick={deleteWorkout}>
                Delete
              </button>

              <button
                  type="submit"
                  className="badge badge-success"
                  onClick={updateWorkout}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Workout...</p>
            </div>
        )}
      </div>
  );
};

export default Workout;
