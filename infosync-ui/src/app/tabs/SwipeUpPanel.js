import React, {Component} from 'react'
import {AppBar,  Toolbar, Typography} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

class SwipeUpPanel extends Component {
    state = {
        value: 0,
        pathMap: [
            '/',
            '/groups',
            '/account'
        ]
    };
    componentWillReceiveProps(UpMenuProps) {
        const {pathname} = UpMenuProps.location;
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
         let button;
         if(value == 0) {
             button = <Typography to={pathMap[0]}>Новости</Typography>
         } if(value == 1) {
             button = <Typography to={pathMap[1]}>Группа</Typography>
         } if(value == 2) {
            button = <Typography to={pathMap[2]}>Аккаунт</Typography>
        }
        return (
            <AppBar position="sticky" className="AppBar">
                <Toolbar value={value} onChange={this.handleChange} >
                    {button}
                </Toolbar>
            </AppBar>
        );

    }
}


export default withRouter(SwipeUpPanel);
