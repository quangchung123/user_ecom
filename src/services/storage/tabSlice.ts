import {createSlice} from "@reduxjs/toolkit";

interface ITabState {
    tabId: number,
    // data: any
}

const initialState: ITabState = {
    tabId: 1,
    // data: null
};
const tabSlice = createSlice({
    initialState,
    name: 'tab',
    reducers: {
        tab: (state, action) => {
           state.tabId = action.payload.tabId;
        },
    },
    extraReducers: (builder) => {

    }
});
export const {tab} = tabSlice.actions;

export default tabSlice;

