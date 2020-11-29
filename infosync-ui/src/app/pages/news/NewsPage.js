import React from 'react'
import PostContentList from './PostContentList'

export default  function NewsPage() {
    return  (
        <div className='all_news'>
            <div className='news_header'>

            </div>
            <div className='news_content'>
                <PostContentList/>
            </div>
        </div>
    );
}
