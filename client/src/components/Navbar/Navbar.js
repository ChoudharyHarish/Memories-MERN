import React, { useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import logo from "../../images/memories-Logo.png";
import text from "../../images/memoriesText.png"
import useStyles from "./styles";

import { useDispatch, useSelector } from 'react-redux';
import { googleLogOut } from '../../redux/authSlice';


function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // let user = JSON.parse(localStorage.getItem('user'));
    const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user'));
    console.log(user);

    useEffect(() => {
        const token = localStorage.getItem('profile');
        if (token) {
            const decoded = decode(token);
            if (decoded.exp * 1000 < Date.now()) dispatch(googleLogOut())
        }
    }, [dispatch]);

    return (
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={logo} alt="" height={45} width={45} />
                <img component={Link} to="/" src={text} alt="" height={40} />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}>{user?.name?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary"
                            onClick={() => {
                                dispatch(googleLogOut())
                                navigate("/");
                            }}
                        >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar