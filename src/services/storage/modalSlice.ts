import {createSlice} from "@reduxjs/toolkit";

interface IModalState {
    modalId: string[],
    // data: any
}

const initialState: IModalState = {
    modalId: [""],
    // data: null
};
const modalSlice = createSlice({
    initialState,
    name: 'modal',
    reducers: {
        modal: (state, action) => {
           state.modalId = action.payload.modalId;
        },
    },
    extraReducers: (builder) => {

    }
});
export const {modal} = modalSlice.actions;

export default modalSlice;

