import React, {Component} from 'react';
import Axios from "axios";
import * as PropTypes from "prop-types";
import {Button, Card, CardActions, CardContent, Chip, Container, Paper, Typography} from "@material-ui/core";
import Loader from "./Loader";
import "./../../css/NewsPage.css"
import {ArrowBack, Face, Done, Clear} from "@material-ui/icons";

class GroupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: {}
        }
    }

    componentDidMount() {
        Axios.get(`/api/groups/${this.props.groupId}/posts`)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state

        const handleDelete = () => {
            console.info('Позже можно прикрутить переход на профиль при клике');
        };

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <Card className="CardGroupPage">
                    <Typography gutterBottom variant="h6" component="h6" className="CardTitle">Список статьей которыми вы поделились с группой</Typography>
                    <Typography gutterBottom variant="h5" component="h2" className="CardTitle">Группа: {this.props.groupTitle}</Typography>
                    <CardContent className="">
                        {items.postsWithStatuses.map(post => (
                            <CardContent key={post.id} className="CardGroupTitle">
                                <Typography gutterBottom variant="h6">{post.title}</Typography>
                                {post.statuses.map(user => (

                                    <Chip
                                        icon={<Face />}
                                        label={user.fullName}
                                        clickable
                                        onDelete={handleDelete}
                                        deleteIcon={user.read ?  <Done style={{color: 'white'}} />  : <Clear style={{color: 'white'}} />}
                                        style = {user.read ? {backgroundColor: "green"}  : {backgroundColor: "red"}}
                                        key={user.fullName + post.id}
                                    />
                                ))}
                            </CardContent>
                        ))}
                    </CardContent>
                    <CardActions className="CardContent">
                        <Button variant="outlined" size="large" fullWidth className="ButtonRead" startIcon={<ArrowBack/>} onClick={() => this.props.takeToBack()}>Назад</Button>
                    </CardActions>
                </Card>

            );
        }
    }
}

GroupInfo.propTypes = {
    groupId: PropTypes.number,
    takeToBack: PropTypes.func,
    groupTitle: PropTypes.string,
}

export default GroupInfo;
