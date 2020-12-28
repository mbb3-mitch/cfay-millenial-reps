import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddExercise from "./components/AddExercise";
import ExercisesList from "./components/ExerciseList";
import Exercise from "./components/Exercise";
import AddSet from "./components/AddSet";
import SetsList from "./components/SetList";
import Set from "./components/Set";
import WorkoutsList from "./components/WorkoutList";
import Workout from "./components/Workout";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/workouts" className="navbar-brand">
                    CFAY Millenial Reps
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/exercises"} className="nav-link">
                            Exercises
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/sets"} className="nav-link">
                            Sets
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/workouts"} className="nav-link">
                            Workouts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/addexercise"} className="nav-link">
                            Add Exercise
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/addset"} className="nav-link">
                            Add Set
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/exercises"]} component={ExercisesList}/>
                    <Route exact path={["/sets"]} component={SetsList}/>
                    <Route exact path={["/","/workouts"]} component={WorkoutsList}/>
                    <Route exact path="/addexercise" component={AddExercise}/>
                    <Route exact path="/addset" component={AddSet}/>
                    <Route path="/exercises/:id" component={Exercise}/>
                    <Route path="/sets/:id" component={Set}/>
                    <Route path="/workouts/:id" component={Workout}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
