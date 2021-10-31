import { configureStore } from "@reduxjs/toolkit";

import { navigationReducer } from "./navigation";
import { watchlistReducer } from "./watchlist";

const store = configureStore({
	reducer: {
		navigation: navigationReducer,
		watchlist: watchlistReducer,
	},
});

export default store;
