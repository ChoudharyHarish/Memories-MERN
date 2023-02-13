import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './post/post';
import useStyles from './styles';

import { useSelector } from "react-redux";

const Posts = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts.posts);
    const isLoading = useSelector((state) => state.posts.isLoading);

    if (!isLoading && !posts.length) return <Grid >No posts</Grid>

    return (
        isLoading ? <CircularProgress /> :
            (
                <Grid className={classes.container} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6}>
                            <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )
    );
};


export default Posts;