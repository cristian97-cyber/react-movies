import style from "./MoviesList.module.css";
import MovieItem from "../MovieItem/MovieItem";

const MoviesList = function (props) {
	const moviesList = props.movies.map(movie => (
		<MovieItem
			key={movie.id}
			id={movie.id}
			image={movie.image}
			title={movie.title}
			rating={movie.rating}
			type={movie.type}
		/>
	));

	return <ul className={style["movies-list"]}>{moviesList}</ul>;
};

export default MoviesList;
