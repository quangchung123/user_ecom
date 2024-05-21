import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	productId: 0
}
const productIdSlice = createSlice({
	name: 'productId',
	initialState,
	reducers: {
		setProductId: (state, action) => {
			state.productId = action.payload.productId
		}
	}
})

export const {setProductId} = productIdSlice.actions;
export default productIdSlice;