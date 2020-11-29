import {
    Box,
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
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

const RegistrationPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [role, setRole] = useState('student');
    const [group, setGroup] = useState('');

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

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value)
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handlePatronymicChange = (event) => {
        setPatronymic(event.target.value)
    }

    const handleChangeRole = (event, value) => {
        setRole(value)
    }

    const handleGroupChange = (event) => {
        setGroup(event.target.value)
    }

    const handleCloseSnackbar = () => {
        setErrorMessage(null)
        setIsLoggedIn(false)
    }

    return (
        <Box minHeight='100%' display='flex' p={2}>
            <Grid container justify='center' alignItems='center' direction='column'>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Grid container direction='column' spacing={2}>
                                <Grid item>
                                    <Typography variant='h5'>Sign up</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField label='E-mail' onChange={handleEmailChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField type='password'
                                               label='Password'
                                               onChange={handlePasswordChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField type='password'
                                               label='Confirm password'
                                               onChange={handlePasswordConfirmChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label='First Name'
                                               onChange={handleFirstNameChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label='Last Name'
                                               onChange={handleLastNameChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label='Patronymic'
                                               onChange={handlePatronymicChange}/>
                                </Grid>
                                <Grid item>
                                    <RadioGroup value={role} onChange={handleChangeRole}>
                                        <FormControlLabel value="student" control={<Radio/>} label="Student"/>
                                        <FormControlLabel value="teacher" control={<Radio/>} label="Teacher"/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item>
                                    <TextField label='Group'
                                               onChange={handleGroupChange}/>
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
            <Snackbar open={isLoggedIn}
                      autoHideDuration={3000}
                      onClose={handleCloseSnackbar}>
                <Alert elevation={6}
                       variant="filled"
                       severity={"success"}
                       onClose={handleCloseSnackbar}>
                    You are successfully logged in!
                </Alert>
            </Snackbar>
            <Snackbar open={errorMessage}
                      autoHideDuration={3000}
                      onClose={handleCloseSnackbar}>
                <Alert elevation={6}
                       variant="filled"
                       severity={"error"}
                       onClose={handleCloseSnackbar}>
                    Error during login perform!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default RegistrationPage;