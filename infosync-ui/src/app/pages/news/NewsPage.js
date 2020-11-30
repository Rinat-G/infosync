import React from 'react'
import PostContentList from './PostContentList'
import {Box} from "@material-ui/core";

export default  function NewsPage() {
    return  (
        <Box p={3} >
            <div className='news_header'>

            </div>
            <div className='news_content'>
                <PostContentList/>
            </div>
        </Box>
    );
}
