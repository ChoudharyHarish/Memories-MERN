import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPosts, GetPost, createNewPost, UpdatePost, DeletePost, LikePost, fetchPostsByFilter, PostComment } from "../api/api";


//getState is function to get current state of application in redux toolkit thunks 
export const fetchPosts = createAsyncThunk('fetchPosts', async (pageNumber, { getState }) => {
    // const state = getState();

    // console.log(state);
    const { data: { currPage, posts, numberOfPages } } = await fetchAllPosts(pageNumber);
    return { posts, currPage, numberOfPages };
})

export const postComment = createAsyncThunk("postComment", async ({ message, id }) => {
    try {
        const { data } = await PostComment({ message, id });
        return data;
    }
    catch (error) {
        console.log(error);
    }

})

export const fetchPost = createAsyncThunk('fetchPost', async (id) => {
    const { data } = await GetPost(id);
    return data;
})

export const getPostBySearch = createAsyncThunk('getPostBySearch', async ({ search, tags }) => {
    const { data } = await fetchPostsByFilter({ search, tags });
    return data;
})

export const createPost = createAsyncThunk('createPost', async (postData) => {
    const { data } = await createNewPost(postData);
    return data;
})
export const updatePost = createAsyncThunk('updatePost', async ({ currentId, postData }) => {
    const { data } = await UpdatePost(postData, currentId);
    return { data, currentId };
})
export const deletePost = createAsyncThunk('deletePost', async (id) => {
    await DeletePost(id);
    return id;
})
export const likePost = createAsyncThunk("likePost", async (id) => {
    const { data } = await LikePost(id);
    return { data, id };
})

const initialState = {
    posts: [],
    post: null,
    currPost: null,
    currentId: null,
    numberOfPages: 1,
    currPage: 1,
    isLoading: true,
}


const postSlice = createSlice({
    name: 'PostSlice',
    initialState,
    reducers: {
        getPost: (state, action) => {
            // Inside a reducer action, the state prints as a Proxy object(in Redux Toolkit), but there is function based on redux - toolkit docs current that you can use to print your state inside reducer actions like this e.g  console.log(current(state.posts));
            const post = state.posts.find((post) => post._id === action.payload);
            state.currPost = post;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            const { posts, currPage, numberOfPages } = action.payload;
            state.posts = posts;
            state.currPage = currPage;
            state.numberOfPages = numberOfPages;
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const { data, currentId } = action.payload
            state.posts = state.posts.map((post) => post._id === currentId ? data : post);

        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            const { data, id } = action.payload
            state.posts = state.posts.map((post) => post._id === id ? data : post);
        })
        builder.addCase(getPostBySearch.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.post = action.payload;
        })

    }
})

export const { getPost, setIsLoading } = postSlice.actions;
export default postSlice.reducer;