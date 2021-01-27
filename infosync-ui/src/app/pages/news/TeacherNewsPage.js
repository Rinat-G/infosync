import React, {Component} from "react";
import Loader from "../../component/Loader";
import ajax from "../../utils/ajax";
import HabrPost from "../../component/HabrPost";
import {Container} from "@material-ui/core";
import FullHabrPost from "../../component/FullHabrPost";

export default class TeacherNewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            linkSingleNews: "",
        };

        this.toClearSingleNews = this.toClearSingleNews.bind(this);
        this.toShowSingleNews = this.toShowSingleNews.bind(this);
    }

    toShowSingleNews(link) {
        this.setState({
            linkSingleNews: link
        })
    }

    toClearSingleNews() {
        this.setState({
            linkSingleNews: "",
            fullText: "",
        })
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
        const {error, isLoaded, items, linkSingleNews} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            if (linkSingleNews !== "") {
                return <FullHabrPost link={linkSingleNews} toHide={this.toClearSingleNews}/>
            } else
                return (
                    <Container maxWidth={"md"}>
                        {items.map((post, i) => {
                            return (
                                <HabrPost
                                    title={post.postTitle}
                                    link={post.postLink}
                                    body={post.postBody}
                                    key={i}
                                    toRead={this.toShowSingleNews}
                                />
                            )
                        })}
                    </Container>
                );
        }
    }
}