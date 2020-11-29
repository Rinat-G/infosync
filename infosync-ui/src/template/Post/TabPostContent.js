import React, {useEffect, useState} from 'react'
import {CardContent, Paper, Typography} from "@material-ui/core";
import Axios from "axios";


const API_KEY = "api/habr/news"

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

    if (content) {
        return (
            <div>
                {content.map(post => {
                    return (
                        <Paper >
                            <CardContent >
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

const ajax = (url, payload) => {
    return Axios({
        method: 'get',
        url: url,
        data: payload,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}
