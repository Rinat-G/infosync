import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";
import MainPage from "./app/tabs/MainPage";
import Loader from "./app/component/Loader";
import ajax from "./app/utils/ajax";
import LoginPage from "./app/pages/login/LoginPage";
import RegistrationPage from "./app/pages/registration/RegistrationPage";
import {Box, makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
}));

const Routing = () => {
    const classes = useStyles();

    useEffect(() => {
            checkAuth()
        }, []
    )
    const checkAuth = () => {
        ajax("/api/user/role",)
            .then(response => {
                setUserRole(response.data)
                setAuthenticated(true);
            })
            .catch(reason => {
                    setAuthenticated(false);
                    console.log(reason);
                }
            )
    }

    const [isAuthenticated, setAuthenticated] = useState(undefined);
    const [userRole, setUserRole] = useState(undefined);

    const loginCallback = () => {
        checkAuth()
    }

    if (isAuthenticated === undefined) {
        return <Loader/>
    }

    return (
        <Box className={classes.root}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login">
                        {isAuthenticated ? <Redirect to="/"/> : <LoginPage loginCallback={loginCallback}/>}
                    </Route>
                    <Route path="/reg">
                        {isAuthenticated ? <Redirect to="/"/> : <RegistrationPage/>}
                    </Route>
                    {isAuthenticated ? <MainPage userRole={userRole}/> : <Redirect to="/login"/>}
                </Switch>
            </BrowserRouter>
        </Box>
    );
};

export default Routing;