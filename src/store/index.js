import { configureStore } from "@reduxjs/toolkit";

import { navigationReducer } from "./navigation";
import { watchlistReducer } from "./watchlist";
import { genresReducer } from "./genres";

const store = configureStore({
	reducer: {
		navigation: navigationReducer,
		watchlist: watchlistReducer,
		genres: genresReducer,
	},
});

export default store;
