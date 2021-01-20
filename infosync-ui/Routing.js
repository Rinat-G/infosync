import React, {useEffect, useState} from "react";
import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./src/app/pages/login/LoginPage";
import ajax from "./src/app/utils/ajax";
import SwipeableTabs from "./src/app/tabs/SwipeableTabs";
import RegistrationPage from "./src/app/pages/registration/RegistrationPage";
import {Redirect} from "react-router";


const Routing = () => {

    const [isAuthenticated, setAuthenticated ] = useState(false);

    useEffect(() => {
            checkAuth()
        }, []
    )


    const checkAuth = () => {
        ajax("/api/user/role",)
            .then(value => {
                setAuthenticated(true);
            })
            .catch(reason => {
                    setAuthenticated(false);
                    console.log(reason);
                }
            )
    }

    const PrivateRoute = () => {

        if (isAuthenticated) {
            return <SwipeableTabs/>
        }

    }


    const loginCallback = () => {
        setAuthenticated(true);
    }


//BrowserRouter <- HashRouter
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    {isAuthenticated ? <Redirect to="/"></Redirect> : <LoginPage loginCallback={loginCallback}/>}
                </Route>
                <Route path="/reg">
                    {isAuthenticated ? <Redirect to="/"></Redirect>: <RegistrationPage/>}
                </Route>
                <Route exact path="/">
                    {isAuthenticated ? <SwipeableTabs/>: <Redirect to="/login"></Redirect>}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;