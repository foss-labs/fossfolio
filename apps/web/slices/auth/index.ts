/* eslint-disable no-param-reassign */
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { supaClient } from '@app/config/supabaseClient';

interface IAuth {
    isLoggedIn: boolean;
    user: User | null;
}

interface User {
    picture: string;
    name: string;
    email: string;
}

const initialState: IAuth = { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state: Draft<IAuth>, action: PayloadAction<any>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        setLoggedOut: (state: Draft<IAuth>) => {
            state.isLoggedIn = false;
            state.user = null;
            supaClient.auth.signOut();
        },
    },
});

export const fetchUser = () => async (dispatch: any) => {
    try {
        const { data, error } = await supaClient.auth.getUser();
        if (error) throw new Error();
        else dispatch(authSlice.actions.setLoggedIn({ payload: data.user?.user_metadata }));
    } catch {
        dispatch(authSlice.actions.setLoggedOut());
    }
};

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
