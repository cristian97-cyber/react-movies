import { Switch, Route } from "react-router";

import Navigation from "./components/layout/Navigation/Navigation";
import SearchMovie from "./components/movies/SearchMovie/SearchMovie";
import HomePage from "./pages/HomePage/HomePage";
import WatchListPage from "./pages/WatchListPage/WatchListPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";

const App = function () {
	return (
		<>
			<Navigation />
			<SearchMovie />

			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/watchlist">
					<WatchListPage />
				</Route>
				<Route path="/:movieId" exact>
					<MovieDetailPage />
				</Route>
				<Route path="*">
					<div>NotFound</div>
				</Route>
			</Switch>
		</>
	);
};

export default App;
