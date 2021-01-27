import React, {Component} from "react";
import * as PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, makeStyles, Paper, Typography} from "@material-ui/core";
import Axios from "axios";
import style from "../../css/HabrPost.css"

//Не знаю как подружить с классаовыми компонентами
// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginBottom: theme.spacing(2),
//     },
//     button: {
//         borderRadius: 0,
//         width: '100%'
//     },
//     actions: {
//         padding: '16px'
//     }
// }));

class HabrPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            fullText: "",
            showPost : false
        }
        this.toRead = this.toRead.bind(this);
        this.toHide = this.toHide.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState.fullText === "") {
            Axios(`api/habr/news/url?link=${this.props.link}`)
                .then(
                    (result) => {
                        this.setState({
                            fullText: result.data
                        });
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                )
        }
    }

    toRead() {
        this.setState({
            showPost: true
        })
    }

    toHide() {
        this.setState({
            showPost: false,
            fullText : ""
        })
    }

    render() {
        const {error, fullText, showPost} = this.state;
        const {title, link, body} = this.props;
        //const classes = useStyles();

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            // return (
            //     <div>
            //         <div style={{display: fullText !== "" ? "none" : "block"}}>
            //             <NewsCard
            //                 id={this.props.id}
            //                 postTitle={this.props.postTitle}
            //                 postBody={this.props.postBody}
            //                 postLink={this.props.postLink}
            //                 toRead={this.toRead}
            //             />
            //         </div>
            //         <Card className="HiddenNewsComponent" style={{display: fullText !== "" ? "block" : "none"}}>
            //             <Button
            //                 onClick={() => {this.toHide()}}
            //                 style={{position: "fixed"}}
            //
            //             >Назад</Button>
            //             <CardContent dangerouslySetInnerHTML={{__html: fullText}}/>
            //         </Card>
            //     </div>
            // );

            return (
                <div>
                    <Paper>
                        <CardContent className="HiddenNewsComponent" style={{display: showPost ? "block" : "none"}}>
                            <Button
                                onClick={() => {this.toHide()}}
                                style={{position: "fixed"}}

                            >Назад</Button>
                            <div dangerouslySetInnerHTML={{__html: fullText}}/>
                        </CardContent>
                    </Paper>

                    <Paper square className="paper" style={{display: showPost ? "none" : "block"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {title}
                            </Typography>
                            <div dangerouslySetInnerHTML={{__html: body}}/>
                        </CardContent>
                        <CardActions className="actions">
                            <Button className="button" variant={'contained'}
                            onClick={() => this.toRead()}
                            >Читать
                            </Button>
                            <Button className="button" variant={"contained"}>Поделиться</Button>
                        </CardActions>
                    </Paper>
                </div>
            )
        }
    }
}

HabrPost.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}
export default HabrPost;
