import React, {Component} from "react";
import Loader from "../../component/Loader";
import ajax from "../../utils/ajax";
import HabrPost from "../../component/HabrPost";
import {Container} from "@material-ui/core";

export default class TeacherNewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        ajax("api/habr/news")
            .then(result => result.data)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
        const {error, isLoaded, items} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            return (
                <Container maxWidth={"md"}>
                    {items.map((post, i) => {
                        return (
                            <HabrPost title={post.postTitle} link={post.postLink} body={post.postBody} key={i}/>
                        )
                    })}
                </Container>
            );
        }
    }
}