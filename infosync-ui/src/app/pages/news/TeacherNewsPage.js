import React, {Component} from "react";
import Loader from "../../component/Loader";
import ajax from "../../utils/ajax";
import HabrPost from "../../component/HabrPost";
import FullHabrPost from "../../component/FullHabrPost";
import ShareNewsWithGroups from "../../component/ShareNewsWithGroups";
import "./../../../css/NewsPage.css"

export default class TeacherNewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            linkSingleNews: "",
            shareNews: undefined,
        };

        this.toClearSingleNews = this.toClearSingleNews.bind(this);
        this.toShowSingleNews = this.toShowSingleNews.bind(this);
        this.toShareNews = this.toShareNews.bind(this);
        this.TakeToBack = this.TakeToBack.bind(this);
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

    toShareNews(habrPost) {
        this.setState({
            shareNews: habrPost,
        })
    }

    TakeToBack() {
        this.setState({
            shareNews: undefined
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
        const {error, isLoaded, items, linkSingleNews, shareNews} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><Loader/></div>;
        } else {
            if (linkSingleNews !== "") {
                return <FullHabrPost link={linkSingleNews} toHide={this.toClearSingleNews}/>
            } else if (shareNews !== undefined) {
                return <ShareNewsWithGroups habrPost={shareNews} takeToBack={this.TakeToBack}/>
            } else
                return (
                    <div>
                        {items.map((post, i) => {
                            return (
                                <HabrPost
                                    title={post.postTitle}
                                    link={post.postLink}
                                    body={post.postBody}
                                    key={i}
                                    toRead={this.toShowSingleNews}
                                    toShare={this.toShareNews}
                                />
                            )
                        })}
                    </div>
                );
        }
    }
}