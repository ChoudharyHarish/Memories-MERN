import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import Paginate from '../pagination';
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPostBySearch, setIsLoading } from '../../redux/postSlice';


//Setting up ueqQuery for our routes which contianes page in their url as we do like in server req.query url/search?page=2 
//we want to search that if url contains a page or not in its query object for that we have to use useLocation and create UseQuery function which will return info about current url

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const classes = useStyles();

    //query contains page info
    const query = useQuery();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    const searchPost = () => {
        if (search || tags) {
            //One thing to note we cant send array in url parameters converting array into , seperated string on server we can again split it to convert into array
            dispatch(setIsLoading(true));
            dispatch(getPostBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else navigate("/");
    }

    const handleKeyPress = (e) => {
        //Keycode 13 means enter is pressed by user
        if (e.keyCode === 13) searchPost();
    }

    const handleAddChip = (tag) => {
        setTags([...tags, tag])
    }

    const handleDeleteChip = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {/* //We want to show pagination only if no filters are applied */}
                        {!searchQuery && !tags.length &&
                            <Paper className={classes.pagination} elevation="6">
                                <Paginate page={page} />
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home