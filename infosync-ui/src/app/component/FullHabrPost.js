import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Paper} from "@material-ui/core";
import Axios from "axios";
import Loader from "./Loader";
import * as PropTypes from "prop-types";

class FullHabrPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            fullText: "",
        }
    }

    componentDidMount() {

        Axios(`api/habr/news/url?link=${this.props.link}`)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        fullText: result.data
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
        const {error, isLoaded, fullText} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <Paper>
                    <CardActions>
                        <Button
                            onClick={() => {
                                this.props.toHide()
                            }}
                            style={{position: "fixed"}}

                        >Назад</Button>
                    </CardActions>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{__html: fullText}}/>
                    </CardContent>
                </Paper>
            );
        }
    }


}

FullHabrPost.propTypes = {
    link: PropTypes.string.isRequired,
    toHide : PropTypes.func.isRequired
}

export default FullHabrPost;

