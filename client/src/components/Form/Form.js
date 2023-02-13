import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from "./styles";
import FileBase from 'react-file-base64';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../redux/postSlice';



const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const classes = useStyles();
    const disptach = useDispatch();
    const currentPost = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null)
    const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (currentPost != null) setPostData(currentPost);
    }, [currentPost]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) disptach(updatePost({ currentId, postData }));
        else disptach(createPost(postData));
        handleClear();
    }

    const handleClear = (e) => {
        console.log(currentId);
        setCurrentId(null);
        console.log(currentId);

        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if (user == null) {
        return (
            <Paper className={classes.paper} raised elevation={6}>
                <Typography style={{ fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    Want to create or like post
                    <Link to='/auth' style={{ textDecoration: 'none' }} >SignUp Now </Link>
                </Typography>
            </Paper>
        )
    }

    return (

        <Paper className={classes.paper} elevation={6} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6">{currentId ? 'Updating Memory' : "Creating Memory"}</Typography>


                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                <Button variant="contained" color="secondary" size="small" fullWidth onClick={() => handleClear()} >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;