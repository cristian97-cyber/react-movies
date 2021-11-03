import { createSlice } from "@reduxjs/toolkit";

const genresSlice = createSlice({
	name: "genres",
	initialState: {
		movie: [],
		tv: [],
	},
	reducers: {
		set(state, action) {
			state.movie = action.payload.movie;
			state.tv = action.payload.tv;
		},
	},
});

const genresReducer = genresSlice.reducer;
const genresActions = genresSlice.actions;

export { genresReducer, genresActions };
