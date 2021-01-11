import {Box, Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import Axios from "axios";
import {Alert} from "@material-ui/lab";
import {HashRouter, Redirect, Route, Switch, useHistory} from "react-router-dom";
import LockOpen from '@material-ui/icons/LockOpen';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';


const ajaxLogin = (email, password) => {
    const formData = new FormData();
    formData.append('username', email)
    formData.append('password', password)
    return Axios({
        method: 'post',
        url: '/api/login',
        data: formData
    })
}

const LoginPage = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        ajaxLogin(email, password)
            .then((value) => {
                if (value.data.success) {
                    props.loginCallback()
                    setIsLoggedIn(true);
                    setErrorMessage(null);
                }
            })
            .catch((reason) => {
                    setIsLoggedIn(false);
                    setErrorMessage("Неверные учетные данные");
                }
            )
    }


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCloseAlert = () => {
        setErrorMessage(null)
        setIsLoggedIn(false)
    }

    const renderAlert = () => {
        if (isLoggedIn || errorMessage) {
            let severity = isLoggedIn ? 'success' : 'error'
            let message = isLoggedIn ? 'Вы успешно авторизовались!' : errorMessage
            return (
                <Alert
                    className={classes.Alert}
                    variant="standard"
                    severity= {severity}
                    onClose={handleCloseAlert}>
                    {message}
                </Alert>
            )
        }
    }



    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1, 0),
                height: 50,
            },
        },
        buttonLogin: {
            color: '#fbfbfb',
            backgroundColor: '#2196f3',
            "&:hover": {
                backgroundColor: "#1976d2",
            },
        },
        buttonReg: {
            color: '#fbfbfb',
            backgroundColor: '#e4084a',
            "&:hover": {
                backgroundColor: "#7b082b",
            },
        },
        HeaderName: {
            backgroundColor: '#303030',
            padding: theme.spacing (2),
        },
        HeadPage: {
            display: 'flex',
        },
        Alert: {
            margin: theme.spacing (1, 2),
        },
    }));

    const classes = useStyles();

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }
    const history = useHistory();
    const Registration = () => history.push('/reg');//eg.history.push('/login');


    return (
        <Box height="100vh" className={classes.HeadPage}>
            <Card>
                <Typography variant='h5' className={classes.HeaderName}>Авторизация</Typography>
                {renderAlert()}
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label='Email' variant="outlined" fullWidth value={email} onChange={handleEmailChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type='password' label="Пароль" fullWidth variant="outlined" onChange={handlePasswordChange}/>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <Button size="large" fullWidth variant='contained' className={classes.buttonLogin} startIcon={<AccountCircle />} onClick={handleLogin}>Войти</Button>
                            <Button size="large" fullWidth variant="contained" className={classes.buttonReg} color="secondary" startIcon={<LockOpen />} onClick={Registration}>Регистрация</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Box>
    )
}

export default LoginPage;