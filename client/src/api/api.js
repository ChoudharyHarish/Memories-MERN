import axios from 'axios';

const url = "https://memories-mern-server.vercel.app/";
const Api = axios.create({ baseURL: url })   //benefit of using this we can define our headers here now only no need of adding them in each request;
// setting headers for every request if we have profile in our local storage 

Api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('profile')}`
    }
    return req;
})

// const fetchAllPosts = () => axios.get(`${url}/posts`); by using axios.create(baseurl) now we can just directly use api.get() methods

// const createNewPost = ({ postData, token }) => axios.post(`${url}/posts`, postData, {
//     headers: {
//         authorization: `Bearer ${token}`
//     }
// });

const fetchAllPosts = (pageNumber) => Api.get(`/posts?page=${pageNumber}`);
const GetPost = (id) => Api.get(`/posts/${id}`);
//? used for query parameter in nodejs remember we can use url/:id for specific resources on server but for searching multiple resources matching query we use query url?name='usa' in server const {name} = req.query
const fetchPostsByFilter = ({ search, tags }) => Api.get(`posts/search?search=${search || 'none'}&tags=${tags}`);
const PostComment = ({ message, id }) => Api.post(`/posts/comments/${id}`, { message })
const createNewPost = (postData) => Api.post("/posts", postData);
const UpdatePost = (postData, id) => Api.patch(`posts/${id}`, postData);
const DeletePost = (id) => Api.delete(`/posts/${id}`);
const LikePost = (id) => Api.patch(`posts/likes/${id}`, id);

const SignUp = (formData) => Api.post(`/auth/signup`, formData);
const LogIn = (formData) => Api.post(`/auth/login`, formData);


export { fetchAllPosts, createNewPost, UpdatePost, DeletePost, LikePost, SignUp, LogIn, fetchPostsByFilter, GetPost, PostComment };