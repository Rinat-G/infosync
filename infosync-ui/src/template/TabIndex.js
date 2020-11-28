import React from 'react'
import { Tab } from 'semantic-ui-react'
import TabIndexNews from "./TabIndexNews";
import TabIndexGroups from "./TabIndexGroups";
import TabIndexAccount from "./TabIndexAccount";


const panes = [
    {
        menuItem: { key: 'newspaper outline', icon: 'newspaper outline', content: 'Новости' },
        render: () => <Tab.Pane attached='top'> <TabIndexNews/> </Tab.Pane>,
    },
    {
        menuItem: { key: 'users', icon: 'users', content: 'Группа' },
        render: () => <Tab.Pane attached='top'> <TabIndexGroups/> </Tab.Pane>,
    },
    {
        menuItem: { key: 'user', icon: 'user', content: 'Аккаунт' },
        render: () => <Tab.Pane attached='top'> <TabIndexAccount/></Tab.Pane>,
    },
]

const TabExampleAttachedBottom = () => (
    <Tab menu={{ attached: 'bottom' }} panes={panes} />
)

export default TabExampleAttachedBottom

