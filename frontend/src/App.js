import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import AddExercise from "./components/AddExercise";
import ExercisesList from "./components/ExerciseList";
import Exercise from "./components/Exercise";
import AddSet from "./components/AddSet";
import SetsList from "./components/SetList";
import Set from "./components/Set";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/tutorials" className="navbar-brand">
                    CFAY Millenial Reps
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/tutorials"} className="nav-link">
                            Tutorials
                        </Link>
                    </li>
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
                        <Link to={"/addtutorial"} className="nav-link">
                            Add Tutorial
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
                    <Route exact path={["/", "/tutorials"]} component={TutorialsList}/>
                    <Route exact path={["/exercises"]} component={ExercisesList}/>
                    <Route exact path={["/sets"]} component={SetsList}/>
                    <Route exact path="/addtutorial" component={AddTutorial}/>
                    <Route exact path="/addexercise" component={AddExercise}/>
                    <Route exact path="/addset" component={AddSet}/>
                    <Route path="/tutorials/:id" component={Tutorial}/>
                    <Route path="/exercises/:id" component={Exercise}/>
                    <Route path="/sets/:id" component={Set}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
