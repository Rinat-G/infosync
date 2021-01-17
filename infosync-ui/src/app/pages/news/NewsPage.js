import React from 'react'
import PostContentList from './PostContentList'
import {Box} from "@material-ui/core";

export default function NewsPage() {
    return (
        <Box p={2}>
            <PostContentList/>
        </Box>
    );
}
