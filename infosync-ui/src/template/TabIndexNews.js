import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

function TabIndexNews() {
    return  (
        <div className='news'>
            <Header as='h2'>
                <Icon name='newspaper outline' />
                <Header.Content>Новости</Header.Content>
            </Header>
        </div>
    );
}
export default TabIndexNews