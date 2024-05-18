import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	productId: 0
}
const productBuyNowSlice = createSlice({
	name: 'productBuyNow',
	initialState,
	reducers: {
		setProductBuyNow: (state, action) => {
			state.productId = action.payload.productId
		}
	}
})

export const {setProductBuyNow} = productBuyNowSlice.actions;
export default productBuyNowSlice;