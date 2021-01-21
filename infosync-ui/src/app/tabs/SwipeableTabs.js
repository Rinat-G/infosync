import React, {Component} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import NewsPage from "../pages/news/NewsPage";
import NavigationBottom from "./NavigationBottom"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AccountPage from "../pages/account/AccountPage";
import GroupsPage from "../pages/groups/GroupsPage";



class SwipeableTabs extends Component {
    render() {
        return (
          <Router>
              <Route path="/news" component={NewsPage} />
              <Route path="/groups" component={GroupsPage} />
              <Route path="/account" component={AccountPage} />
              <NavigationBottom />
          </Router>
        );
    }
}

export default SwipeableTabs;