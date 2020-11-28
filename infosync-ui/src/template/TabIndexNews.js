import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

function TabIndexNews() {
    return  (
        <div className='all_news'>
            <div className='news_header'>
                <Header as='h2'>
                    <Icon name='newspaper outline' />
                    <Header.Content>Новости</Header.Content>
                </Header>
            </div>
            <div className='news_content'>

            </div>
        </div>
    );
}

export default TabIndexNews