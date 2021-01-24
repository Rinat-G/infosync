import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import "./../../css/NewsPage.css"


class NavigationBottom extends Component {
    state = {
        value: 0,
        pathMap: [
            '/',
            '/groups',
            '/account'
        ]
    };

    componentWillReceiveProps(NewsProps) {
        const {pathname} = NewsProps.location;
        const {pathMap} = this.state;

        const value = pathMap.indexOf(pathname);

        if (value > -1) {
            this.setState({
                value
            });
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };



    render() {
        const {value, pathMap} = this.state;

        return (
            <BottomNavigation value={value} onChange={this.handleChange} className="NavigationIcon">
                <BottomNavigationAction label="Новости" icon={<AnnouncementOutlinedIcon />} component={Link} to={pathMap[0]} />
                <BottomNavigationAction label="Группа" icon={<PermIdentityOutlinedIcon />} component={Link} to={pathMap[1]} />
                <BottomNavigationAction label="Аккаунт" icon={<PeopleAltOutlinedIcon />} component={Link} to={pathMap[2]} />
            </BottomNavigation>
        );
    }
}


export default withRouter(NavigationBottom);