import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {Button, CardActions, CardContent, Paper} from "@material-ui/core";
import * as PropTypes from 'prop-types';
import Axios from "axios";
import Loader from "./Loader";

class ShareNewsWithGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkGroups: [],
            isLoaded: false,
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.toShare = this.toShare.bind(this);
    }

    componentDidMount() {
        Axios.get('/api/groups')
            .then(response => response.data.map(group => [group, false]))
            .then(checkBox => {
                this.setState({checkGroups: checkBox, isLoaded: true})
            })
            .catch(error => console.log(`НЕУДАЧА(((:\n\t${error}`))
    }

    handleCheckboxChange(groupId) {
        let checkGroup = this.state.checkGroups
        let elem = checkGroup.find(x => x[0].id === groupId)
        elem[1] = !elem[1]
        this.setState({
            checkGroup: checkGroup,
        })
    }

    toShare() {
        const url = `/api/forward`
        const group =  this.state.checkGroups.filter(x => x[1])
            .map(x => x[0].name)
        const habrPost = this.props.habrPost

        let data = JSON.stringify({
            groups: group,
            habrPost: habrPost,
        });

        Axios.post(url,data,{headers:{"Content-Type" : "application/json"}})
            .then(response => console.log(response.data))
            .then(() => this.props.takeToBack())
            .catch(err => console.error(`ShareNewsWithGroups.js FAIL:\n\t${err}`))
    }

    render() {

        const {checkGroups, isLoaded} = this.state

        if (!isLoaded) {
            return (
                <div><Loader/></div>
            )
        } else {
            return (
                <Paper>
                    <CardActions>
                        <Button onClick={() => this.props.takeToBack()}>
                            Назад
                        </Button>
                    </CardActions>
                    {checkGroups.map(res =>
                        <CardContent key={res[0].id}>
                            {res[0].name}
                        <Checkbox
                        checked={res[1]}
                        onChange={() => this.handleCheckboxChange(res[0].id)}
                        />
                        </CardContent>
                    )}
                    <CardActions>
                        <Button onClick={() => this.toShare()}>
                            Порекомендовать
                        </Button>
                    </CardActions>
                </Paper>
            )
        }
    }
}

ShareNewsWithGroups.propTypes = {
    habrPost: PropTypes.object.isRequired,
    takeToBack: PropTypes.func.isRequired,
}

export default ShareNewsWithGroups;