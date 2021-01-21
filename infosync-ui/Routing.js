import React, {useEffect, useState} from "react";
import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./src/app/pages/login/LoginPage";
import ajax from "./src/app/utils/ajax";
import SwipeableTabs from "./src/app/tabs/SwipeableTabs";
import RegistrationPage from "./src/app/pages/registration/RegistrationPage";
import {Redirect} from "react-router";
import GroupsPage from "./src/app/pages/groups/GroupsPage";
import AccountPage from "./src/app/pages/account/AccountPage";


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

    const loginCallback = () => {
        setAuthenticated(true);
    }


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    {isAuthenticated ? <Redirect to="/news"></Redirect> : <LoginPage loginCallback={loginCallback}/>}
                </Route>
                <Route path="/reg">
                    {isAuthenticated ? <Redirect to="/news"></Redirect>: <RegistrationPage/>}
                </Route>
                <Route path="/groups">
                    {isAuthenticated ? <GroupsPage/>: <Redirect to="/login"></Redirect>}
                </Route>
                <Route path="/account">
                    {isAuthenticated ? <AccountPage/>: <Redirect to="/login"></Redirect>}
                </Route>
                <Route exact path="/news">
                    {isAuthenticated ? <SwipeableTabs/>: <Redirect to="/login"></Redirect>}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;