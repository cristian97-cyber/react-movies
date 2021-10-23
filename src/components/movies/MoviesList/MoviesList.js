import style from "./MoviesList.module.css";
import MovieItem from "../MovieItem/MovieItem";

const MoviesList = function (props) {
	const moviesList = props.movies.map(movie => (
		<MovieItem
			key={movie.id}
			id={movie.id}
			image={movie.image}
			title={movie.title}
			type={movie.type}
			rating={movie.rating}
			genres={movie.genres}
			runtime={movie.runtime}
			language={movie.language}
			releaseDate={movie.releaseDate}
			actors={movie.actors}
			plot={movie.plot}
		/>
	));

	return <ul className={style["movies-list"]}>{moviesList}</ul>;
};

export default MoviesList;
