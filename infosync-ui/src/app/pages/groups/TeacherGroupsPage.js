import React, {Component} from 'react'
import Loader from "../../component/Loader";
import {Card, CardContent, Container, Typography} from "@material-ui/core";


export default class TeacherGroupsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
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
        let {isLoaded, items} = this.state;

        if (!isLoaded) {
            return <Loader/>
        } else {
            return (
                <Container>

                    {items.map(numbers_group => (
                        <Card key={numbers_group.id} style={{margin: "15px 0px"}}>
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