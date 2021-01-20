import React from 'react'
import PostContentList from './PostContentList'
import {AppBar, Box, Card, Container, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Home} from "@material-ui/icons";




export default  function NewsPage() {

    const useStyles = makeStyles((theme) => ({
        HeaderName: {
            padding: theme.spacing (2),
        },
        HeadPage: {
            display: 'flex',
        },
        AppBar: {
            backgroundColor: '#232323',
        },
        PostContent: {
            margin: theme.spacing (2,0),
        }
    }));

    const classes = useStyles();

    function refreshPage() {
        window.location.reload();
    }

    return  (
        <div>
            <AppBar position="sticky" className={classes.AppBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="news" className={classes.AppBar} onClick={ refreshPage }>
                        <Home />
                    </IconButton>
                    <Typography variant='h5' className={classes.HeaderName}>Новости</Typography>
                </Toolbar>
            </AppBar>
            <Box spacing={5}>
                <Container className={classes.PostContent} >
                    <PostContentList/>
                </Container>
            </Box>
        </div>



    );
}