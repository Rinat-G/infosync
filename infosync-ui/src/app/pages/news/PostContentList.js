import React, {Component} from 'react'
import { CardContent,  Typography, CircularProgress,  Container, Card} from "@material-ui/core";
import Axios from "axios";

export default class PostContentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        const url = "/api/habr/news";
        const userRole = () => {
            return Axios
                .get('/api/user/role')
                .then(response => response())
                .catch(() => console.log("Нет доступа к " + url + " Проверьте доступ к массиву данных1"))
        }
    }
    render() {
        let {isLoaded, items} = this.state;

        if (!isLoaded) {
            return <CircularProgress />
        } else {
            return (
                <Container>
                    {items.map(news_page => (
                        <Card style={{ margin: "15px 0px" }}>
                            <CardContent>
                                <Typography>{news_page.postTitle}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Container>

            );
        }
    }

}
