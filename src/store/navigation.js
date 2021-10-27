import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
	name: "navigation",
	initialState: {
		showResponsiveNav: false,
	},
	reducers: {
		toggleResponsiveNav(state) {
			state.showResponsiveNav = !state.showResponsiveNav;
		},

		closeResponsiveNav(state) {
			state.showResponsiveNav = false;
		},
	},
});

const navigationReducer = navigationSlice.reducer;
const navigationActions = navigationSlice.actions;

export { navigationReducer, navigationActions };
