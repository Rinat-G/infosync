import { AppBar, Box, Button, Card, CardContent, Grid, TextField, Toolbar, Typography } from "@material-ui/core";
import React, {useState} from "react";
import Axios from "axios";
import {Alert} from "@material-ui/lab";
import {Redirect, useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';

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
                    setErrorMessage("Неверные учетные данные ");
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
                    severity={severity}
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
            backgroundColor: '#1a2639',
            "&:hover": {
                backgroundColor: "#1a2639",
            },
        },
        HeaderName: {
            padding: theme.spacing(2),
        },
        HeadPage: {
            display: 'flex',
        },
        Alert: {
            margin: theme.spacing(1, 2),
        },
        AppBar: {
            backgroundColor: '#25282b',
        },
        CardLogin: {
            backgroundColor: '#0d1117',
        }
    }));

    const classes = useStyles();

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    const history = useHistory();
    const Registration = () => history.push('/reg');


    return (
        <Box height="100vh" className={classes.HeadPage}>
            <Card className={classes.CardLogin}>
                <AppBar position="static" className={classes.AppBar}>
                    <Toolbar>
                        <Typography variant='h5' className={classes.HeaderName}>Авторизация</Typography>
                    </Toolbar>
                </AppBar>
                {renderAlert()}
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField label='Email' variant="outlined" fullWidth value={email}
                                       onChange={handleEmailChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type='password' label="Пароль" fullWidth variant="outlined"
                                       onChange={handlePasswordChange}/>
                        </Grid>
                        <Grid item xs={12} className={classes.root}>
                            <Button size="large" fullWidth variant='contained' className={classes.buttonLogin}
                                    startIcon={<AccountCircle/>} onClick={handleLogin}>Войти</Button>
                            <Box textAlign="right">
                                <Link onClick={Registration}>Зарегистрироваться</Link>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Box>
    )
}

export default LoginPage;