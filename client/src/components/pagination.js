import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { fetchPosts, setIsLoading } from '../redux/postSlice';

import useStyles from './style';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (page) {
            dispatch(setIsLoading(true));
            dispatch(fetchPosts(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={page || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                //item.page will automatically change page number as per the button it was clicked
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;