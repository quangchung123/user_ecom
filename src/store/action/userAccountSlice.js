import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: ''
}

const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        }
    }
})

export const { setUser } = userAccountSlice.actions;
export default userAccountSlice;
