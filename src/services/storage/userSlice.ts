import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import userApi from "@/services/api/userApi";

interface IUserState {
    info: any,
    token: string,
}

const initialState: IUserState = {
    info: null,
    token: '',
};
const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) =>{
        builder.addMatcher(isAnyOf(userApi.endpoints.login.matchFulfilled),(state,action)=>{
            return action.payload.data;
        })
    }
});
export const {logout} = userSlice.actions;

export const selectUser = 'user.info'

export default userSlice;

