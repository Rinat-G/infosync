import React, {Component} from 'react';
import Axios from "axios";
import Loader from "../../component/Loader";

class StudentGroupsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            members: []
        }

    }

    componentDidMount() {
        Axios.get(`/api/groups/self`)
            .then(response => this.setState(
                {members: response.data, isLoaded: true}))
            .catch(err => console.error(`GET GROUP MEMBERS IS FAILED:\n\t${err}`))
    }

    render() {
        const {isLoaded, members} = this.state


        if (!isLoaded) {
            return <Loader/>
        } else {
            return (
                <div>
                    {members.map(name =>
                        <div>{name}</div>
                    )}
                </div>
            );
        }
    }
}

export default StudentGroupsPage;
