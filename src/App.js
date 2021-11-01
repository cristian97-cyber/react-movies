import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router";

import { watchlistActions } from "./store/watchlist";
import Navigation from "./components/layout/Navigation/Navigation";
import SearchMovie from "./components/movies/SearchMovie/SearchMovie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
			<Switch>
				<Route path="/" exact>
					<Redirect to="/movies" />
				</Route>

				<Route path="/movies" exact>
					<Navigation query={searchQuery} onChangeQuery={changeQuery} />
					<SearchMovie query={searchQuery} onChangeQuery={changeQuery} />

					<MoviesPage />
				</Route>
				<Route path="/movies/:movieType/:movieId" exact>
					<Navigation query={searchQuery} onChangeQuery={changeQuery} />
					<SearchMovie query={searchQuery} onChangeQuery={changeQuery} />

					<MovieDetailPage />
				</Route>
				<Route path="/watchlist" exact>
					<Navigation query={searchQuery} onChangeQuery={changeQuery} />
					<SearchMovie query={searchQuery} onChangeQuery={changeQuery} />

					<WatchListPage />
				</Route>
				<Route path="*">
					<NotFoundPage />
				</Route>
			</Switch>
		</>
	);
};

export default App;
