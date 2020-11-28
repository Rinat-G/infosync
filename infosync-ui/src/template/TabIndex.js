import React from 'react'
import { Tab } from 'semantic-ui-react'


const panes = [
    {
        menuItem: { key: 'newspaper outline', icon: 'newspaper outline', content: 'Новости' },
        render: () => <Tab.Pane attached='top'>Новости</Tab.Pane>,
    },
    {
        menuItem: { key: 'users', icon: 'users', content: 'Группа' },
        render: () => <Tab.Pane attached='top'>Группа</Tab.Pane>,
    },
    {
        menuItem: { key: 'user outline', icon: 'user outline', content: 'Аккаунт' },
        render: () => <Tab.Pane attached='top'>Аккаунт</Tab.Pane>,
    },
]

const TabExampleAttachedBottom = () => (
    <Tab menu={{ attached: 'bottom' }} panes={panes} />
)

export default TabExampleAttachedBottom

