import React, {useEffect, useState} from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./src/app/pages/login/LoginPage";
import ajax from "./src/app/utils/ajax";
import SwipeableTabs from "./src/app/tabs/SwipeableTabs";


const Routing = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);

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

    const renderPrivateRoute = () => {

        if (isAuthenticated) {
            return <SwipeableTabs/>
        }
        return <Redirect to={'/login'}/>
    }

    const loginCallback = () => {
        setAuthenticated(true);
    }

    return (
        <HashRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage loginCallback={loginCallback}/>
                </Route>
                <Route path="/">
                    {renderPrivateRoute()}
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default Routing;

