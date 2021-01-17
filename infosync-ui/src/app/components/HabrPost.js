import React from "react";
import * as PropTypes from 'prop-types';
import {Button, CardContent, Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(2),
    },
    button: {
        borderRadius: 0,
        width: '100%'
    }
}));

const HabrPost = (props) => {
    const {title, link, body} = props;
    const classes = useStyles();

    return (
        <Grid container justify={"center"}>
            <Grid item xs={12} sm={9} md={6}>
                <Paper square className={classes.paper}>
                    <CardContent>
                        <Typography gutterBottom variant="h6">
                            {title}
                        </Typography>
                        <div dangerouslySetInnerHTML={{__html: body}}/>

                    </CardContent>
                    <Grid container direction='row'
                          justify='space-between'
                          wrap='nowrap' alignItems='stretch'>
                        <Grid item xs={7}>
                            <Button className={classes.button} variant={'contained'}>Читать дальше</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button className={classes.button} variant={"contained"}>Поделиться</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    )

}

HabrPost.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}
export default HabrPost;