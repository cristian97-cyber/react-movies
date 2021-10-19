import { Switch, Route } from "react-router";

import Navigation from "./components/layout/Navigation/Navigation";

const App = function () {
	return (
		<>
			<Navigation />

			<Switch>
				<Route path="/" exact>
					<div>Homepage</div>
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
