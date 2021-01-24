import React from 'react'
import {Typography, Button, IconButton, Toolbar, AppBar, Box, Card, CardContent} from "@material-ui/core";
import {ExpandMore, HomeOutlined} from "@material-ui/icons";
import "./../../../css/NewsPage.css"

function refreshPage() {
    window.location.reload();
}

const ButtonShare = () => {
    return (
            <Button size="small" color="primary">Поделиться</Button>

    )
}

const ButtonReadMore = () => {
    return (
        <Button size="small" color="primary">Читать</Button>
    )
}

const PostTitle = (props) => {
    return (
        <Typography gutterBottom variant="h6">
            {props.postTitle}
        </Typography>
    );
}

const ButtonWithHouse = (props) => {
    return (
        <IconButton edge="start" color="inherit" aria-label="home" onClick={refreshPage}>
            <HomeOutlined/>
        </IconButton>
    )
}


const OneNews = (props) => {
    return (
        <Card key={props.key} className="CardNews">
            <NewsComponents.Html.Title id={props.id} postTitle={props.postTitle}/>
            <NewsComponents.Html.Body postBody={props.postBody}/>
        </Card>
    )
}

const Title = (props) => {
    return (
            <Typography gutterBottom variant="h5" component="h2" className="CardTitle">{props.postTitle}</Typography>
    )
}
const Body = (props) => {
    return (
        <CardContent className="CardContent">
            <div dangerouslySetInnerHTML={{__html: props.postBody}}/>
        </CardContent>
    )
}


const NewsContent = (props) => {
    return (
        <div className='NewsContent'>
            {props.items.map(item => (
                <NewsComponents.Html.OneNews id={props.id} postTitle={item.postTitle} postBody={item.postBody}/>
            ))}
        </div>
    )
}

const NewsContentBox = (props) => {
    return (
        <Box>
            <NewsComponents.Html.NewsContent
                role={props.role}
                items={props.items}
                id={props.id}
            />
        </Box>
    )
}


const Html = {
    ButtonShare,
    ButtonReadMore,
    PostTitle,
    ButtonWithHouse,
    Title,
    Body,
    OneNews,
    NewsContent,
    NewsContentBox
}

const NewsComponents = {
    Html,

}

export default NewsComponents