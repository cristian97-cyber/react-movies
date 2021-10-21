import style from "./WatchListPage.module.css";
import DUMMY_MOVIES from "../../dummy_movies";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";

const WatchListPage = function () {
	return (
		<main className={style["watchlist-page"]}>
			<MoviesList movies={DUMMY_MOVIES} />
			<Pagination />
		</main>
	);
};

export default WatchListPage;
