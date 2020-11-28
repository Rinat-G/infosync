import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

function TabIndexGroups() {
    return  (
        <div className='news'>
            <Header as='h2'>
                <Icon name='users' />
                <Header.Content>Группа</Header.Content>
            </Header>
        </div>
    );
}
export default TabIndexGroups