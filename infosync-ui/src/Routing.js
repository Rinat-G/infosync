import React, {useEffect, useState} from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./app/pages/login/LoginPage";
import ajax from "./app/utils/ajax";
import SwipeableTabs from "./app/tabs/SwipeableTabs";
import RegistrationPage from "./app/pages/registration/RegistrationPage";
import Loader from "./app/components/Loader";

const Routing = () => {
    const [isAuthenticated, setAuthenticated] = useState(undefined)

    useEffect(() => {
            checkAuth()
        }, []
    )

    const checkAuth = () => {
        ajax("/api/user/role",)
            .then(() => {
                setAuthenticated(true);
            })
            .catch(reason => {
                    console.log(reason);
                    setAuthenticated(false);
                }
            )
    }

    const renderPrivateRoute = () => {
        if (isAuthenticated) {
            return <SwipeableTabs/>
        }
        return (
            <Redirect to={'/login'}/>
        );
    }

    const loginCallback = () => {
        setAuthenticated(true);
    }

    if (isAuthenticated === undefined) {
        return <Loader/>
    }

    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage loginCallback={loginCallback}/>
                </Route>
                <Route path="/reg">
                    <RegistrationPage/>
                </Route>
                <Route path="/">
                    {renderPrivateRoute()}
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default Routing;

