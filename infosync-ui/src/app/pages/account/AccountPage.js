import React, {Component} from 'react'
import {Button, Card} from "@material-ui/core";
import Axios from "axios";
import Loader from "../../component/Loader";


const logout = () => {
    alert(`ПОКА НЕ РАБОТАЕТ`)
}


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
            .catch(err => console.log(`FAIL GET USER_INFO: ${err}`))
    }

    render() {
        const {isLoaded, item} = this.state

        if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <div>
                    <Button onClick={logout}>ВЫЙТИ</Button>
                    <Card className="CardNews">
                        Фамилия {item.lastName}<br/>
                        Имя {item.firstName}<br/>
                        Отчество {item.patronymic}<br/>
                        Электронная почта {item.email}<br/>
                        Группа {item.group}<br/>
                    </Card>
                </div>
            );
        }
    }
}

export default AccountPage