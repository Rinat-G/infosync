import React from 'react'
import SwipeableViews from 'react-swipeable-views';
import {makeStyles} from '@material-ui/core/styles';
import {BottomNavigation, BottomNavigationAction, Box} from "@material-ui/core";
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import NewsPage from "../pages/news/NewsPage";
import GroupsPage from "../pages/groups/GroupsPage";
import AccountPage from "../pages/account/AccountPage";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
}));

const shouldRenderPage = (value, index, component) => {
    return value === index ? component : <Box/>
}

export default function SwipeableTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <SwipeableViews axis={'x'} index={value} onChangeIndex={handleChangeIndex}>
                {shouldRenderPage(value, 0, <NewsPage/>)}
                {shouldRenderPage(value, 1, <GroupsPage/>)}
                {shouldRenderPage(value, 2, <AccountPage/>)}
            </SwipeableViews>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction icon={<AnnouncementOutlinedIcon/>} label="Новости"/>
                <BottomNavigationAction icon={<PeopleAltOutlinedIcon/>} label="Группа"/>
                <BottomNavigationAction icon={<PermIdentityOutlinedIcon/>} label="Аккаунт"/>
            </BottomNavigation>
        </div>
    );
}

