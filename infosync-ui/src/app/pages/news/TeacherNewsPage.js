import React, {Component} from "react";
import NewsComponents from "./NewsComponents";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar, Box, CircularProgress,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {ExpandMore, HomeOutlined} from "@material-ui/icons";
import styles from "../../../css/NewsPage.css";


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
        fetch("api/habr/news")
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
        const {error, isLoaded, items} = this.state;

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><CircularProgress/></div>;
        } else {
            return (
                <NewsComponents.Html.NewsContentBox
                    role="teacher"
                    items={items}
                    id="teacher"
                />
            );
        }
    }
}