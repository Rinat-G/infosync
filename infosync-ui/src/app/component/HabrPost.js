import React, {Component} from "react";
import * as PropTypes from 'prop-types';
import {Button, Card, CardActions, CardContent, makeStyles, Paper, Typography} from "@material-ui/core";

//Не знаю как подружить с классаовыми компонентами
// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginBottom: theme.spacing(2),
//     },
//     button: {
//         borderRadius: 0,
//         width: '100%'
//     },
//     actions: {
//         padding: '16px'
//     }
// }));

class HabrPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    render() {
        const {error} = this.state;
        const {title, link, body} = this.props;
        //const classes = useStyles();

        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <Paper square className="paper">
                    <CardContent>
                        <Typography gutterBottom variant="h6">
                            {title}
                        </Typography>
                        <div dangerouslySetInnerHTML={{__html: body}}/>
                    </CardContent>
                    <CardActions className="actions">

                        <Button className="button" variant={'contained'}
                                onClick={() => this.props.toRead(link)}
                        >Читать
                        </Button>

                        <Button className="button" variant={"contained"}
                                onClick={() => this.props.toShare({postTitle : title, postLink : link, postBody : body})}

                        >Поделиться
                        </Button>

                    </CardActions>
                </Paper>
            )
        }
    }
}

HabrPost.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    toRead: PropTypes.func.isRequired,
    toShare: PropTypes.func.isRequired,
}
export default HabrPost;
