import { createSlice } from "@reduxjs/toolkit";

const initialState = {
		state: undefined
}
const resetStateSlice = createSlice({
		name: 'resetState',
		initialState,
			reducers: {
					setState: (state, action) => {
							localStorage.clear();
					}
			}
})
export const { setState } = resetStateSlice.actions;
export default resetStateSlice;