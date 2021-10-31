import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router";

import { watchlistActions } from "./store/watchlist";
import Navigation from "./components/layout/Navigation/Navigation";
import SearchMovie from "./components/movies/SearchMovie/SearchMovie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";

const App = function () {
	const dispatch = useDispatch();

	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const searchQueryParam = urlParams.get("search") || "";

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const storedWatchlist = localStorage.getItem("watchlist");
		if (!storedWatchlist) return;

		const watchlist = JSON.parse(storedWatchlist);
		dispatch(watchlistActions.setItems(watchlist));
	}, [dispatch]);

	useEffect(() => {
		setSearchQuery(searchQueryParam);
	}, [searchQueryParam]);

	const changeQuery = function (newQuery) {
		setSearchQuery(newQuery);
	};

	return (
		<>
			<Navigation query={searchQuery} onChangeQuery={changeQuery} />
			<SearchMovie query={searchQuery} onChangeQuery={changeQuery} />

			<Switch>
				<Route path="/" exact>
					<Redirect to="/movies" />
				</Route>

				<Route path="/movies" exact>
					<MoviesPage />
				</Route>
				<Route path="/movies/:movieType/:movieId" exact>
					<MovieDetailPage />
				</Route>
				<Route path="/watchlist" exact>
					<WatchListPage />
				</Route>
				<Route path="*">
					<div>NotFound</div>
				</Route>
			</Switch>
		</>
	);
};

export default App;
