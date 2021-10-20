import { Switch, Route } from "react-router";

import Navigation from "./components/layout/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";

const App = function () {
	return (
		<>
			<Navigation />

			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/watchlist">
					<div>WatchList</div>
				</Route>
				<Route path="/:movieId" exact>
					<div>Movie detail</div>
				</Route>
				<Route path="*">Not found</Route>
			</Switch>
		</>
	);
};

export default App;
