import React, {Component} from 'react'
import Loader from "../../component/Loader";
import {Card, CardContent, Container, Typography} from "@material-ui/core";
import GroupInfo from "../../component/GroupInfo";


export default class TeacherGroupsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            toLookGroup: undefined,
            nameToLookGroup: "",
        }

        this.toLookGroup = this.toLookGroup.bind(this);
        this.takeToBack = this.takeToBack.bind(this);
    }

    toLookGroup(groupId, name) {
        this.setState({
            toLookGroup: groupId,
            nameToLookGroup: name,
        })
    }

    takeToBack() {
        this.setState({
            toLookGroup: undefined
        })
    }

    componentDidMount() {
        const url = "/api/groups";
        fetch(url)
            .then(response => response.json())
            .then(groups => {
                this.setState({
                    isLoaded: true,
                    items: groups
                })
            })
            .catch(() => console.log("Нет доступа к " + url + " Проверьте доступ к массиву данных"))
    }

    render() {
        let {isLoaded, items, toLookGroup, nameToLookGroup} = this.state;

        if (!isLoaded) {
            return <Loader/>
        } else {
            if (toLookGroup !== undefined) {
                return (
                    <GroupInfo
                        groupId={toLookGroup}
                        takeToBack={this.takeToBack}
                        groupTitle={nameToLookGroup}
                    />
                );

            } else {

                return (
                    <Container>
                        {items.map(numbers_group => (
                            <Card
                                key={numbers_group.id}
                                style={{margin: "15px 0px"}}
                                onClick={() => this.toLookGroup(numbers_group.id, numbers_group.name)}
                            >
                                <CardContent>
                                    <Typography>Группа: {numbers_group.name}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Container>

                );
            }
        }
    }
}