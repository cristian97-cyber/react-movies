import style from "./MovieDetail.module.css";

const MovieDetail = function (props) {
	const movie = props.movie;
	console.log(movie.languages);

	return (
		<div className={style["movie-detail"]}>
			<figure className={style["movie-detail__figure"]}>
				<img src={movie.image} alt={movie.title} />
			</figure>
			<div className={style["movie-detail__info"]}>
				<p>
					<span>Title: </span> {movie.title}
				</p>
				<p>
					<span>Release date: </span> {movie.releaseDate}
				</p>
				<p>
					<span>Type: </span> {movie.type === "movie" ? "Movie" : "Series"}
				</p>
				<p>
					<span>Genres: </span>{" "}
					{movie.genres.map(genre => genre.name).join(", ")}
				</p>
				<p>
					<span>{movie.type === "movie" ? "Runtime" : "Episode runtime"}:</span>{" "}
					{movie.runtime} min
				</p>
				<p>
					<span>Spoken languages: </span>{" "}
					{movie.languages.map(lang => lang.english_name).join(", ")}
				</p>
				<p>
					<span>Plot: </span> {movie.plot}
				</p>
			</div>
		</div>
	);
};

export default MovieDetail;
