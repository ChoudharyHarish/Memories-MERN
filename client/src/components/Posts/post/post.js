import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../redux/postSlice";
import { useDispatch } from 'react-redux';


const Post = ({ post, currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [likes, setLikes] = useState(post?.likes);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deletePost(post._id));
    }


    const openPost = (e) => navigate(`/posts/${post._id}`)


    const hasLikedPost = likes.find((id) => id === user?.userId);

    const handleLikes = () => {
        dispatch(likePost(post._id))
        if (hasLikedPost) {
            setLikes(likes.filter((userId) => userId !== user.userId))
        }
        else setLikes([...likes, user.userId]);
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === (user?.userId))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };


    return (
        <Card className={classes.card} raised elevation={6} >
            <ButtonBase component="span" className={classes.cardAction} onClick={(e) => openPost(e)} >
                <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.createdBy}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">Hello {post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.userId} onClick={() => handleLikes()}>
                    <Likes />
                </Button>
                {user?.userId === post.userId &&
                    <div className={classes.overlay2}>
                        <Button style={{ color: 'white' }} size="small"><MoreHorizIcon fontSize="default"
                            onClick={() => setCurrentId(post._id)} /></Button>
                    </div>}
                {user?.userId === post.userId &&
                    <Button size="small" color="primary" onClick={(e) => handleSubmit(e)} ><DeleteIcon fontSize="small" /> Delete</Button>}
            </CardActions>
        </Card>
    );
}

export default Post;