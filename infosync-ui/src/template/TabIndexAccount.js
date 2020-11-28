import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

function TabIndexAccount() {
    return  (
        <div className='news_header'>
            <Header as='h2'>
                <Icon name='user outline' />
                <Header.Content>Аккаунт</Header.Content>
            </Header>
        </div>
    );
}
export default TabIndexAccount