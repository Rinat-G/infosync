import React, {Component, useContext} from "react";
import * as PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import "./../../css/NewsPage.css"
import {Book, Share} from "@material-ui/icons";


class HabrPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    render() {
        const {error} = this.state;
        const {title, link, body, status} = this.props

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <Card className="CardNews">
                    <Typography gutterBottom variant="h5" component="h2" className="CardTitle">{title}</Typography>
                    <CardContent className="CardContent">
                        <div dangerouslySetInnerHTML={{__html: body}}/>
                    </CardContent>
                    <CardActions className="CardContent">
                        {this.props.role === "teacher" ?
                            <Button variant="outlined" size="large" fullWidth className="ButtonShare"
                                    startIcon={<Share/>}
                                    onClick={() => this.props.toShare(
                                        {postTitle: title, postLink: link, postBody: body})
                                    }
                            >Поделиться</Button> :

                            <div>{status ? <div>Прочитано</div> : <div>Не прочитано</div>}</div>
                        }
                        <Button variant="outlined" size="large" fullWidth className="ButtonRead" startIcon={<Book/>}
                                onClick={() => this.props.toRead(link, this.props.postId)}>Читать</Button>


                    </CardActions>
                </Card>
            )
        }
    }
}

HabrPost.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    toRead: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
}
export default HabrPost;
