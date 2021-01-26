import React from "react";
import * as PropTypes from 'prop-types';
import {Button, CardActions, CardContent, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
    },
    button: {
        borderRadius: 0,
        width: '100%'
    },
    actions: {
        padding: '16px'
    }
}));

const HabrPost = (props) => {
    const {title, link, body} = props;
    const classes = useStyles();

    return (
        <Paper square className={classes.paper}>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {title}
                </Typography>
                <div dangerouslySetInnerHTML={{__html: body}}/>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button className={classes.button} variant={'contained'}>Читать</Button>
                <Button className={classes.button} variant={"contained"}>Поделиться</Button>
            </CardActions>
        </Paper>
    )

}

HabrPost.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}
export default HabrPost;