import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Weather from "./Weather";
import ReportEvent from "./ReportEvent";
import AllEvents from "./AllEvents";
import Profile from "./Profile";
import "./App.css";

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path='/' component={Weather} />
                        <PrivateRoute
                            exact
                            path='/zglos-zdarzenie'
                            component={ReportEvent}
                        />
                        <PrivateRoute
                            exact
                            path='/wszystkie-uszkodzenia'
                            component={AllEvents}
                        />
                        <PrivateRoute
                            exact
                            path='/profil'
                            component={Profile}
                        />
                        <Route exact path='/rejestracja' component={Signup} />
                        <Route exact path='/logowanie' component={Login} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
