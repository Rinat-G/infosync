import React, {Component} from 'react'
import NewsPage from "../pages/news/NewsPage";
import NavigationBottom from "./NavigationBottom"
import {Route} from 'react-router-dom';
import SwipeUpPanel from "./SwipeUpPanel";
import GroupsPage from "../pages/groups/GroupsPage";
import AccountPage from "../pages/account/AccountPage";
import {UserProvider} from "../context/UserContext";

class MainPage extends Component {
    constructor(props) {
        super(props);
        console.log("User role is " + props.userRole)

    }

    render() {
        return (
            <UserProvider value={{role: this.props.userRole}}>
                <SwipeUpPanel/>
                <Route exact path="/" component={NewsPage}/>
                <Route path="/groups" component={GroupsPage}/>
                <Route path="/account" component={AccountPage}/>
                <NavigationBottom/>
            </UserProvider>
        );
    }
}

export default MainPage;