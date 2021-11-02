import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import style from "./MovieDetailPage.module.css";
import { navigationActions } from "../../store/navigation";
import useHttp from "../../hooks/http";
import { API_URL, API_POSTER_URL, API_KEY } from "../../config";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import Message from "../../components/layout/Message/Message";
import MovieDetail from "../../components/movies/MovieDetail/MovieDetail";

const MovieDetailPage = function () {
	const dispatch = useDispatch();

	const { movieType, movieId } = useParams();

	const [movie, setMovie] = useState(null);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getMovie = async function () {
			const data = await sendHttpRequest({
				url: `${API_URL}/${movieType}/${movieId}?api_key=${API_KEY}&language=en-US`,
			});
			if (!data) return;

			const movie = {
				id: data.id,
				image: data.poster_path && `${API_POSTER_URL}${data.poster_path}`,
				title: data.title || data.name,
				rating: data.vote_average,
				releaseDate: data.release_date || data.first_air_date,
				type: movieType,
				genres: data.genres,
				runtime: data.runtime || data.episode_run_time,
				languages: data.spoken_languages,
				plot: data.overview,
			};
			setMovie(movie);
		};
		getMovie();
	}, [movieType, movieId, sendHttpRequest]);

	return (
		<main
			className={style["movie-detail-page"]}
			onClick={() => dispatch(navigationActions.closeResponsiveNav())}
		>
			{isLoading && <LoadingSpinner />}

			{!isLoading && error && <Message type="error" message={error.message} />}

			{!isLoading && !error && movie && <MovieDetail movie={movie} />}
		</main>
	);
};

export default MovieDetailPage;
