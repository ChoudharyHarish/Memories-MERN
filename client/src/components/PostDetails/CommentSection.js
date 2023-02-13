import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux/postSlice';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef();

    const handleComment = async () => {
        const id = post._id;
        const message = `${user?.name}: ${comment}`;
        const { payload: { comments } } = await dispatch(postComment({ message, id }));
        setComment('');
        setComments(comments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {!user ?
                    <div style={{ width: '50%' }}>
                        <Typography variant='h5' >Want to Comment <br /> <Link to='/auth' style={{ textDecoration: 'none', color: 'black' }}>SignUp or Login now </Link></Typography>
                    </div>
                    :
                    <div style={{ width: '70%' }}>

                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <br />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default CommentSection;