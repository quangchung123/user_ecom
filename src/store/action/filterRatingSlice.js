import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	rating: 0
}
const filterRatingSlice = createSlice({
	name: 'filterRating',
	initialState,
	reducers: {
		setRating: (state, action) => {
			state.rating = action.payload.rating
		}
	}
})

export const {setRating} = filterRatingSlice.actions;
export default filterRatingSlice;