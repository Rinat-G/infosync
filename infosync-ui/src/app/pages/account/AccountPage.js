import React, {Component} from 'react'
import {Box, Button, Card, CardContent, Grid, TextField} from "@material-ui/core";
import Axios from "axios";
import Loader from "../../component/Loader";
import "./../../../css/NewsPage.css"
import {ExitToApp} from "@material-ui/icons";

class AccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            item: {}
        }
    }

    componentDidMount() {
        Axios.get(`/api/user/info`)
            .then(response => this.setState({
                isLoaded: true,
                item: response.data
            }))
            .catch(err => console.error(`FAIL GET USER_INFO: ${err}`))
    }

    render() {
        const {isLoaded, item} = this.state

        if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <Card className="CardAccount">
                    <CardContent className="CardContent">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Фамилия"
                                    fullWidth
                                    defaultValue={item.lastName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Имя"
                                    fullWidth
                                    defaultValue={item.firstName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Отчество"
                                    fullWidth
                                    defaultValue={item.patronymic}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Email"
                                    fullWidth
                                    defaultValue={item.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="filled-read-only-input"
                                    label="Группа"
                                    fullWidth
                                    defaultValue={item.group}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    {
                        // <CardContent>
                        //     <Button variant="contained" fullWidth color="secondary" size="large"
                        //             startIcon={<ExitToApp/>} className="ButtonExit"
                        //             onClick={this.cookies}>Выход</Button>
                        // </CardContent>
                    }
                </Card>
            );
        }
    }
}

export default AccountPage