/* eslint-disable no-param-reassign */
import { createSlice, Draft } from '@reduxjs/toolkit';

interface IAuth {
    isLoggedIn: boolean;
    user: Record<string, any> | null;
}

const initialState: IAuth = { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state: Draft<IAuth>) => {
            state.isLoggedIn = true;
        },
    },
});

export const authReducer = authSlice.reducer;
