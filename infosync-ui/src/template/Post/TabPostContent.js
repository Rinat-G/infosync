import React, {useEffect, useState} from 'react'
import {CardContent, Link, makeStyles, Paper, Typography} from "@material-ui/core";
import Axios from "axios";
import ajax from "../../utils/ajax";


const API_KEY = "api/habr/news"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
    },
}));

const TabPostContent = () => {


    const [content, setContent] = useState();

    useEffect(() => {
            loadContent()
        }, []
    )

    const loadContent = () => {
        ajax('/api/habr/news')
            .then(value => {
                setContent(value.data)
            })
            .catch(reason => console.log(reason))

    }

    const classes = useStyles();
    if (content) {
        return (
            <div>
                {content.map(post => {
                    return (
                        <Paper className={classes.paper}>
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {post.postTitle}
                                </Typography>
                                <div dangerouslySetInnerHTML={{__html: post.postBody}}/>
                            </CardContent>
                        </Paper>
                    )
                })}
            </div>
        );
    }
    return (
        <div>
            {API_KEY}
        </div>
    );

}


export default TabPostContent
