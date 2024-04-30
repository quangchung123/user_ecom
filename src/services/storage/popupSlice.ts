import {createSlice} from "@reduxjs/toolkit";

interface IPopupState {
    popupId: string[],
    data: any
}

const initialState: IPopupState = {
    popupId: ["shop"],
    data: null
};
const popupSlice = createSlice({
    initialState,
    name: 'popup',
    reducers: {
        popup: (state, action) => {
            if(action.payload.hasOwnProperty("data")){
                state.popupId = action.payload.popupId;
                state.data = action.payload.data;
            }else{
                state.popupId=action.payload;
                state.data= null;
            }
        },
    },
    extraReducers: (builder) => {

    }
});
export const {popup} = popupSlice.actions;

export const selectUser = 'user.info'

export default popupSlice;

