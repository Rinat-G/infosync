import React, {Component} from 'react';
import Axios from "axios";
import * as PropTypes from "prop-types";
import {Button, CardActions, CardContent, Container, Paper, Typography} from "@material-ui/core";
import Loader from "./Loader";

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

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <Paper>
                    <CardActions>
                        <Button variant={'contained'} onClick={() => this.props.takeToBack()}>Назад</Button>
                    </CardActions>
                    <Typography gutterBottom variant="h6">
                        {this.props.groupTitle}
                    </Typography>

                    <Container>
                        {items.postsWithStatuses.map(post => (
                            <CardContent key={post.id}>
                                <Typography gutterBottom variant="h6">
                                    {post.title}
                                </Typography>
                                {post.statuses.map(user => (
                                    <div style={user.read ? {color: 'green'} : {color: 'red'}}
                                         key={user.fullName + post.id}>
                                        {user.fullName}
                                    </div>
                                ))}
                            </CardContent>
                        ))}
                    </Container>
                </Paper>

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
