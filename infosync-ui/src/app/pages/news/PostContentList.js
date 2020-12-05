import React, {useEffect, useState} from 'react'
import {Box, CardContent, makeStyles, Paper, Typography, Button} from "@material-ui/core";
import ajax from "../../utils/ajax";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegistrationPage from "../registration/RegistrationPage";
import LoginPage from "../login/LoginPage";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const API_KEY = "api/habr/news"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
    },
}));

const PostContentList = () => {


    const [content, setContent] = useState();

    useEffect(() => {
            loadContent()
        }, []
    )

    const loadContent = () => {
        ajax('/api/habr/news')
            .then(value => {
                setContent(value.data)
            })
            .catch(reason => console.log(reason))

    }

    const classes = useStyles();
    if (content) {
        return (
            <Box>
                {content.map(post => {
                    return (
                        <Paper className={classes.paper}>
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {post.postTitle}
                                </Typography>
                                <div dangerouslySetInnerHTML={{__html: post.postBody}}/>
                            </CardContent>
                        </Paper>
                    )
                })}
            </Box>
        );
    }

    return (
        <Router>
            <Link to="auth">
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AssignmentIndIcon  />}>Авторизация
                </Button>
            </Link>
            <Link to="/reg">
                <Button
                     variant="contained"
                    color="secondary"
                     startIcon={<LockOpenIcon  />}>Регистрация
                 </Button>
            </Link>

            <Switch>
                <Route exact path="/"></Route>
                <Route path="/auth"  component={LoginPage}></Route>
                <Route path="/reg"  component={RegistrationPage}></Route>
            </Switch>
        </Router>

    );

}


export default PostContentList
