import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	products: {}
}
const productSelected = createSlice({
	name: 'productSelected',
	initialState,
	reducers: {
		setProductSelected: (state, action) => {
			state.products = action.payload.products
		}
	}
})

export const {setProductSelected} = productSelected.actions;
export default productSelected;