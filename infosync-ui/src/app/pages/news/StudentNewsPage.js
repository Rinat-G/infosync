import React, {Component} from "react";
import Loader from "../../component/Loader";
import HabrPost from "../../component/HabrPost";
import FullHabrPost from "../../component/FullHabrPost";


export default class StudentNewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            linkSingleNews: "",
            fullText: "",
            idSingleNews: undefined,
        };

        this.toClearSingleNews = this.toClearSingleNews.bind(this);
        this.toShowSingleNews = this.toShowSingleNews.bind(this);
    }

    toShowSingleNews(link, postId) {
        this.setState({
            linkSingleNews: link,
            idSingleNews: postId,
        })
    }

    toClearSingleNews() {
        this.setState({
            linkSingleNews: "",
            fullText: "",
            idSingleNews: undefined,
        })
    }

    componentDidMount() {
        fetch("api/news/student")
            .then(res => res.json())
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
        const {error, isLoaded, items, linkSingleNews, fullText, idSingleNews} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            if (linkSingleNews !== "") {
                return <FullHabrPost
                    link={linkSingleNews}
                    toHide={this.toClearSingleNews}
                    role={"student"}
                    postId={idSingleNews}
                />
            } else {
                return (
                    <div>
                        {items.map((post, i) => {
                            return (
                                <HabrPost
                                    title={post.post.title}
                                    link={post.post.postLink}
                                    body={post.post.postBody}
                                    key={i}
                                    toRead={this.toShowSingleNews}
                                    toShare={this.toShareNews}
                                    role="student"
                                    status={post.status}
                                    postId={post.post.id}
                                />
                            )
                        })}
                    </div>
                );
            }
        }
    }
}