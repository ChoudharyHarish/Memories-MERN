import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignUp, LogIn } from "../api/api";


export const signUp = createAsyncThunk('signUp', async (form) => {
    try {
        const { data } = await SignUp(form);
        return data;
    }
    catch (error) {
        console.log(error);
    }
})

export const logIn = createAsyncThunk('logIn', async (form) => {
    try {
        const { data } = await LogIn(form);
        return data;
    }
    catch (error) {
        console.log(error);
    }
})


const initialState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        googleLogin: (state, action) => {
            const { result, token } = action.payload
            state.user = {
                imageUrl: result.imageUrl,
                name: result.givenName,
                userId: result.googleId
            }
            localStorage.setItem('profile', token)
            localStorage.setItem('user', JSON.stringify({ ...state.user }))
        },
        googleLogOut: (state, action) => {
            state.user = null;
            localStorage.removeItem('profile');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            const result = action.payload;
            state.user = {
                name: result.name,
                userId: result.userId
            }
            localStorage.setItem('profile', result.token);
            localStorage.setItem('user', JSON.stringify({ ...state.user }));

        })
        builder.addCase(logIn.fulfilled, (state, action) => {
            const result = action.payload;
            state.user = {
                name: result.name,
                userId: result.userId
            }
            localStorage.setItem('profile', result.token);
            localStorage.setItem('user', JSON.stringify({ ...state.user }));
        })
    }
})

export const { googleLogin, googleLogOut } = authSlice.actions;
export default authSlice.reducer;