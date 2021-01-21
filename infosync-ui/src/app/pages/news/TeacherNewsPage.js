import React, { Component } from "react";
import NewsComponents from "./NewsComponents";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar, CircularProgress,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {ExpandMore, HomeOutlined} from "@material-ui/icons";


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
        const { error, isLoaded, items } = this.state;

        function refreshPage(){
            window.location.reload();
        }

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div><CircularProgress /></div>;
        } else {
            return (
                <div>
                    <AppBar position="sticky">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={ refreshPage }>
                                <HomeOutlined />
                            </IconButton>
                            <Typography variant="h6" >Новости педагога</Typography>
                        </Toolbar>
                    </AppBar>
                    {items.map(item => (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore/>} id="teacher">
                                <Typography>{item.postTitle}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div dangerouslySetInnerHTML={{__html: item.postBody}}/>
                            </AccordionDetails>
                        </Accordion>
                    ))}


                </div>
            );
        }
    }
}