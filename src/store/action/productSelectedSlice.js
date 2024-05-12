import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	productId: 0
}
const productSelectedSlice = createSlice({
	name: 'productSelected',
	initialState,
	reducers: {
		setProductSelected: (state, action) => {
			state.productId = action.payload.productId
		}
	}
})

export const {setProductSelected} = productSelectedSlice.actions;
export default productSelectedSlice;