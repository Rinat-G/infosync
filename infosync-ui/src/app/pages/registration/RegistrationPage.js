import {
    Box,
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import {Alert} from "@material-ui/lab";
import ajax from "../../utils/ajax";


const RegistrationPage = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');

    const [role, setRole] = useState('student');
    const [group, setGroup] = useState('');

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

    const handleCloseAlert = () => {
        setErrorMessage(null)
        setRegisterSuccess(false)
    }

    const renderGroupField = (role) => {
        if (role === 'student') {
            return (
                <Grid item>
                    <TextField required
                               label='Group'
                               value={group}
                               onChange={handleGroupChange}/>
                </Grid>
            )
        }
    }

    const handleRegistration = () => {
        if (password !== passwordConfirm) {
            setErrorMessage('Password and password confirm did not match')
            return
        }

        const registrationData = {
            email,
            password,
            firstName,
            lastName,
            patronymic: patronymic ? patronymic : null,
            group: role === 'student' ? group : null,
            role
        }

        ajax('/api/registration', registrationData, 'post')
            .then(() => {
                setRegisterSuccess(true);
                setErrorMessage(null);
                resetState();

            })
            .catch((reason) => {
                    setErrorMessage(reason.response.data[0]);

                }
            )
    }

    const resetState = () => {
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setFirstName('')
        setLastName('')
        setPatronymic('')
        setRole('student')
        setGroup('')
    }

    const renderAlert = () => {
        if (registerSuccess || errorMessage) {
            let severity = registerSuccess ? 'success' : 'error'
            let message = registerSuccess ? 'You are successfully registered!' : errorMessage
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
        <Box minHeight='100%' display='flex' p={2}>
            <Grid container justify='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Grid container direction='column' spacing={2}>
                                <Grid item>
                                    <Typography variant='h5'>Sign up</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField required
                                               label='E-mail'
                                               value={email}
                                               onChange={handleEmailChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField required
                                               type='password'
                                               label='Password'
                                               value={password}
                                               onChange={handlePasswordChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField required
                                               type='password'
                                               label='Confirm password'
                                               value={passwordConfirm}
                                               onChange={handlePasswordConfirmChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField required
                                               label='First Name'
                                               value={firstName}
                                               onChange={handleFirstNameChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField required
                                               label='Last Name'
                                               value={lastName}
                                               onChange={handleLastNameChange}/>
                                </Grid>
                                <Grid item>
                                    <TextField label='Patronymic'
                                               value={patronymic}
                                               onChange={handlePatronymicChange}/>
                                </Grid>
                                <Grid item>
                                    <RadioGroup value={role} onChange={handleChangeRole}>
                                        <FormControlLabel value="student" control={<Radio/>} label="Student"/>
                                        <FormControlLabel value="teacher" control={<Radio/>} label="Teacher"/>
                                    </RadioGroup>
                                </Grid>
                                {renderGroupField(role)}
                                <Grid item>
                                    <Button variant='contained'
                                            color='primary'
                                            onClick={handleRegistration}>Submit</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {renderAlert()}
            </Grid>
        </Box>
    )
}

export default RegistrationPage;