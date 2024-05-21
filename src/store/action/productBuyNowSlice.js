import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	productSelectedId: 0
}
const productBuyNowSlice = createSlice({
	name: 'productBuyNow',
	initialState,
	reducers: {
		setProductBuyNow: (state, action) => {
			state.productSelectedId = action.payload.productSelectedId
		}
	}
})

export const {setProductBuyNow} = productBuyNowSlice.actions;
export default productBuyNowSlice;