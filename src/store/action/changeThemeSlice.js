import {createSlice} from "@reduxjs/toolkit";

const initialState = {
		theme: false
}
const changeThemeSlice = createSlice({
		name: 'themeMode',
		initialState,
		reducers: {
				setTheme: (state, action) => {
						state.theme = action.payload.theme
				}
		}
})

export const {setTheme} = changeThemeSlice.actions;
export default changeThemeSlice;