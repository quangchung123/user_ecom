import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	cities: ''
}
const dataCitySelectedSlice = createSlice({
	name: 'citySelected',
	initialState,
	reducers: {
		setDataCity: (state, action) => {
			state.cities = action.payload.cities
		}
	}
})

export const {setDataCity} = dataCitySelectedSlice.actions;
export default dataCitySelectedSlice;