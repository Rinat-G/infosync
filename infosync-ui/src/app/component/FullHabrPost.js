import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import Axios from "axios";
import Loader from "./Loader";
import * as PropTypes from "prop-types";
import "./../../css/NewsPage.css"
import {ArrowBack} from "@material-ui/icons";

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

        if(this.props.role === "student") {
            Axios.put(`api/news/${this.props.postId}`)
                .then(response => console.log(`Status updated: ${response.status}`))
                .catch(err => console.error(`Cannot update status:\n\t${err}`))
        }

    }

    render() {
        const {error, isLoaded, fullText} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <Card className="CardNews">
                    <CardActions className="CardContent">
                        <Button variant="outlined" size="large" className="ButtonBack" fullWidth startIcon={<ArrowBack/>} onClick={() => { this.props.toHide() }}>Назад</Button>
                    </CardActions>
                    <CardContent className="CardContent">
                        <div dangerouslySetInnerHTML={{__html: fullText}}/>
                    </CardContent>
                    <CardActions className="CardContent">
                        <Button onClick={() => { this.props.toHide() }}>Назад</Button>
                    </CardActions>
                </Card>

            );
        }
    }


}

FullHabrPost.propTypes = {
    link: PropTypes.string.isRequired,
    toHide : PropTypes.func.isRequired
}

export default FullHabrPost;

