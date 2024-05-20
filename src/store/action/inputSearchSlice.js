import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	valueInput: ''
}
const inputSearchSlice = createSlice({
	name: 'inputSearch',
	initialState,
	reducers: {
		setInputSearch: (state, action) => {
			state.valueInput = action.payload.valueInput
		}
	}
})

export const {setInputSearch} = inputSearchSlice.actions;
export default inputSearchSlice;