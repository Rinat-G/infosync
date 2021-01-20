import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField, Toolbar,
    Typography,
    IconButton
} from "@material-ui/core";
import React, {useState} from "react";
import {Alert} from "@material-ui/lab";
import ajax from "../../utils/ajax";
import {useHistory} from "react-router-dom";
import LockOpen from "@material-ui/icons/LockOpen";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowBack} from "@material-ui/icons";


const RegistrationPage = (props) => {
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
                <Grid item xs={12}>
                    <TextField required label='Группа' value={group} fullWidth variant="outlined" onChange={handleGroupChange}/>
                </Grid>
            )
        }
    }

    const handleRegistration = () => {
        if (password !== passwordConfirm) {
            setErrorMessage('Пароли не совпадают!')
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
            let message = registerSuccess ? 'Вы успешно зарегистрировались!' : errorMessage
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
            padding: theme.spacing (2),
        },
        HeadPage: {
            display: 'flex',
        },
        Alert: {
            margin: theme.spacing (1, 2),
        },
        AppBar: {
            backgroundColor: '#232323',
        },
    }));

    const classes = useStyles();
    const history = useHistory();
    const Login = () => history.push('/login');

    return (
        <Box height="100vh" className={classes.HeadPage}>
            <Card>
                <AppBar position="static" className={classes.AppBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="back" onClick={Login} className={classes.AppBar}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant='h5' className={classes.HeaderName}>Регистрация</Typography>
                    </Toolbar>
                </AppBar>
                {renderAlert()}
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField required label='Email' value={email} fullWidth variant="outlined" onChange={handleEmailChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required type='password' label='Пароль' value={password} fullWidth variant="outlined" onChange={handlePasswordChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required type='password' label='Подтвердите пароль' value={passwordConfirm} fullWidth variant="outlined" onChange={handlePasswordConfirmChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required label='Имя' value={firstName} fullWidth variant="outlined" onChange={handleFirstNameChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required label='Фамилия' value={lastName} fullWidth variant="outlined" onChange={handleLastNameChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Отчество' value={patronymic} fullWidth variant="outlined" onChange={handlePatronymicChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup value={role} onChange={handleChangeRole}>
                                <FormControlLabel value="student" control={<Radio/>} label="Студент"/>
                                <FormControlLabel value="teacher" control={<Radio/>} label="Преподаватель"/>
                            </RadioGroup>
                        </Grid>
                        {renderGroupField(role)}
                        <Grid item xs={12} className={classes.root}>
                            <Button size="large" fullWidth variant="contained" className={classes.buttonReg} color="secondary" onClick={handleRegistration}>Зарегистрироваться</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default RegistrationPage;