import React, {useEffect, useState} from 'react'
import {Box} from "@material-ui/core";
import ajax from "../../utils/ajax";
import Loader from "../../components/Loader";
import HabrPost from "../../components/HabrPost";

const API_KEY = "api/habr/news"

const PostContentList = () => {

    const [content, setContent] = useState();

    useEffect(() => {
            loadContent()
        }, []
    )

    const loadContent = () => {
        ajax(API_KEY)
            .then(value => {
                setContent(value.data)
            })
            .catch(reason => console.log(reason))
    }

    if (content) {
        return (
            <Box>
                {content.map((post, i) => {
                    return (
                        <HabrPost title={post.postTitle} link={post.postLink} body={post.postBody} key={i}/>
                    )
                })}
            </Box>
        );
    }

    return (
        <Loader/>
    );
}

export default PostContentList
