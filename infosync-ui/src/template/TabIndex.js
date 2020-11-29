import React from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Typography, Box, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {Paper} from "@material-ui/core";
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import TabIndexNews from "./TabIndexNews";
import TabIndexGroups from "./TabIndexGroups";
import TabIndexAccount from "./TabIndexAccount";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <div className={classes.root}>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {<TabIndexNews/>}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {<TabIndexGroups/>}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {<TabIndexAccount/>}
                </TabPanel>
            </SwipeableViews>
            <Paper position="static" color="default">
                <BottomNavigation value={value} onChange={handleChange}>
                    <BottomNavigationAction icon={<AnnouncementOutlinedIcon />} label="Новости"  {...a11yProps(0)} />
                    <BottomNavigationAction icon={<PeopleAltOutlinedIcon />} label="Группа"  {...a11yProps(1)} />
                    <BottomNavigationAction icon={<PermIdentityOutlinedIcon  />} label="Аккаунт"  {...a11yProps(2)} />
                </BottomNavigation>
            </Paper>
        </div>
    );
}

