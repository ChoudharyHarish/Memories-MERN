import React from "react";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
const App = () => {


    //Checking if token exists then user cant access the auth route
    const token = localStorage.getItem('profile');
    const user = localStorage.getItem('user');
    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    {/* We use render and callback function inside it to navigate to another component in react routerv6 earlier we can do this by Redirect component now we have to use Navigate component */}
                    <Route path="/" exact element={<Navigate to='/posts' />} />
                    <Route path='/posts' exact element={<Home />} />
                    <Route path='/posts/search' exact element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path="/auth" element={!token && !user ? <Auth /> : <Navigate to='/posts' />} />
                </Routes>
            </Container>
        </Router>
    )
}

export default App;