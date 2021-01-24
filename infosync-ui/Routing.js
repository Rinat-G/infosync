import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./src/app/pages/login/LoginPage";
import SwipeableTabs from "./src/app/tabs/SwipeableTabs";
import RegistrationPage from "./src/app/pages/registration/RegistrationPage";
import {Redirect} from "react-router";
import GroupsPage from "./src/app/pages/groups/GroupsPage";
import AccountPage from "./src/app/pages/account/AccountPage";
import ajax from "./src/app/utils/ajax";


const Routing = () => {

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



    const [isAuthenticated, setAuthenticated ] = useState(false);

    const loginCallback = () => {
        setAuthenticated(true);
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    {isAuthenticated ? <Redirect to="/"></Redirect> : <LoginPage loginCallback={loginCallback}/>}
                </Route>
                <Route path="/reg">
                    {isAuthenticated ? <Redirect to="/"></Redirect>: <RegistrationPage/>}
                </Route>
                <Route path="/groups">
                    {isAuthenticated ? <GroupsPage/>: <Redirect to="/login"></Redirect>}
                </Route>
                <Route path="/account">
                    {isAuthenticated ? <AccountPage/>: <Redirect to="/login"></Redirect>}
                </Route>
                <Route exact path="/">
                    {isAuthenticated ? <SwipeableTabs/>: <Redirect to="/login"></Redirect>}
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;