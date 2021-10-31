import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
	name: "watchlist",
	initialState: {
		totItems: [],
		numItems: 0,
		totPages: 0,
		pageItems: [],
	},
	reducers: {
		setItems(state, action) {
			state.totItems = action.payload;
			state.numItems = state.totItems.length;

			state.totPages = Math.floor(state.numItems / 20);
			if (state.numItems % 20 > 0) state.totPages++;
		},

		addItem(state, action) {
			state.totItems.push(action.payload);
			state.numItems++;

			localStorage.setItem("watchlist", JSON.stringify(state.totItems));

			state.totPages = Math.floor(state.numItems / 20);
			if (state.numItems % 20 > 0) state.totPages++;
		},

		removeItem(state, action) {
			state.totItems = state.totItems.filter(it => it.id !== action.payload);
			state.numItems--;

			state.totPages = Math.floor(state.numItems / 20);
			if (state.numItems % 20 > 0) state.totPages++;

			if (state.numItems > 0) {
				localStorage.setItem("watchlist", JSON.stringify(state.totItems));
			} else {
				localStorage.clear("watchlist");
			}
		},

		setPageItems(state, action) {
			const page = action.payload;

			const firstItemIndex = (page - 1) * 20;
			const lastItemIndex = page < state.totPages ? page * 20 : state.numItems;

			state.pageItems = state.totItems.slice(firstItemIndex, lastItemIndex);
		},
	},
});

const watchlistReducer = watchlistSlice.reducer;
const watchlistActions = watchlistSlice.actions;

export { watchlistReducer, watchlistActions };
