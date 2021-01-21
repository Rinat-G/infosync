import React from 'react'
import {Typography, Button} from "@material-ui/core";

const ButtonShare = () => {
    return (
        <Button>Поделиться</Button>
    )
}

const ButtonReadMore = () => {
    return (
        <Button>Читать дальше</Button>
    )
}

const PostTitle = (props) => {
    return (
        <Typography gutterBottom variant="h6">
            {props.postTitle}
        </Typography>
    );
}

const Html = {
    ButtonShare,
    ButtonReadMore,
    PostTitle,
}

const NewsComponents = {
    Html,

}

export default NewsComponents