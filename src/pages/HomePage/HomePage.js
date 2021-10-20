import style from "./HomePage.module.css";
import DUMMY_MOVIES from "../../dummy_movies";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";

const HomePage = function () {
	return (
		<main className={style.homepage}>
			<MoviesList movies={DUMMY_MOVIES} />
			<Pagination />
		</main>
	);
};

export default HomePage;
