import {Box, Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import Axios from "axios";
import {Alert} from "@material-ui/lab";


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

const LoginPage = () => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        ajaxLogin(email, password)
            .then((value) => {
                if (value.data.success) {
                    setIsLoggedIn(true);
                    setErrorMessage(null);
                }

            })
            .catch((reason) => {
                    setIsLoggedIn(false);
                    setErrorMessage(reason.response.data.message);
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
            let severity = isLoggedIn ? 'success' : 'error}'
            let message = isLoggedIn ? 'You are successfully logged in!' : errorMessage
            return (
                <Alert elevation={6}
                       variant="filled"
                       severity={severity}
                       onClose={handleCloseAlert}>
                    {message}
                </Alert>
            )
        }
    }

    return (
        <Box minHeight='100%' display='flex'>
            <Grid container justify='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Card>
                        {renderAlert()}
                        <CardContent>
                            <Grid container direction='column' spacing={2}>
                                <Grid item>
                                    <Typography variant='h5'>Sign in</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField label='E-mail' value={email} onChange={handleEmailChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField type='password'
                                               label='Password'
                                               onChange={handlePasswordChange}/>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained'
                                            color='primary'
                                            onClick={handleLogin}>Submit</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LoginPage;