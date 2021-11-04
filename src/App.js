import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router";

import { API_KEY, API_URL } from "./config";
import { watchlistActions } from "./store/watchlist";
import { genresActions } from "./store/genres";
import useHttp from "./hooks/http";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navigation from "./components/layout/Navigation/Navigation";
import SearchMovie from "./components/movies/SearchMovie/SearchMovie";

const App = function () {
	console.log("Ready");
	const dispatch = useDispatch();

	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const searchQueryParam = urlParams.get("search") || "";

	const [searchQuery, setSearchQuery] = useState("");

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const storedWatchlist = localStorage.getItem("watchlist");
		if (!storedWatchlist) return;

		const watchlist = JSON.parse(storedWatchlist);
		dispatch(watchlistActions.setItems(watchlist));
	}, [dispatch]);

	useEffect(() => {
		const getGenres = async function () {
			const movieData = await sendHttpRequest({
				url: `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
			});
			if (!movieData) return;

			const tvData = await sendHttpRequest({
				url: `${API_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`,
			});
			if (!tvData) return;

			const movie = [];
			const tv = [];

			movieData.genres.forEach(gen => {
				movie.push({ id: gen.id, name: gen.name });
			});

			tvData.genres.forEach(gen => {
				tv.push({ id: gen.id, name: gen.name });
			});

			dispatch(genresActions.set({ movie, tv }));
		};
		getGenres();
	}, [dispatch, sendHttpRequest]);

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

					<MoviesPage isLoadingGenres={isLoading} genresError={error} />
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
