import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
	name: "watchlist",
	initialState: {
		totItems: [],
		numItems: 0,
		pageItems: [],
		numPages: 0,
	},

	reducers: {
		setItems(state, action) {
			state.totItems = action.payload;
			state.numItems = state.totItems.length;

			state.numPages = Math.floor(state.numItems / 20);
			if (state.numItems % 20 > 0) state.numPages++;
		},

		addItem(state, action) {
			state.totItems.push(action.payload);
			state.numItems++;

			state.numPages = Math.floor(state.numItems / 20);
			if (state.numItems % 20 > 0) state.numPages++;

			localStorage.setItem("watchlist", JSON.stringify(state.totItems));
		},

		removeItem(state, action) {
			state.totItems = state.totItems.filter(it => it.id !== action.payload);
			state.numItems--;

			state.numPages = Math.floor(state.numItems / 20);
			if (state.numItems % 20 > 0) state.numPages++;

			if (state.numItems > 0) {
				localStorage.setItem("watchlist", JSON.stringify(state.totItems));
			} else {
				localStorage.clear("watchlist");
			}
		},

		setPageItems(state, action) {
			const page = action.payload;

			const firstItemIndex = (page - 1) * 20;
			const lastItemIndex = page < state.numPages ? page * 20 : state.numItems;
			state.pageItems = state.totItems.slice(firstItemIndex, lastItemIndex);
		},
	},
});

const watchlistReducer = watchlistSlice.reducer;
const watchlistActions = watchlistSlice.actions;

export { watchlistReducer, watchlistActions };
