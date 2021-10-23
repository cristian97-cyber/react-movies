import { useState, useEffect } from "react";

import style from "./HomePage.module.css";
import useHttp from "../../hooks/http";
import { API_URL, API_POSTER_URL, API_KEY } from "../../config";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/layout/ErrorMessage/ErrorMessage";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";

const HomePage = function () {
	const [movies, setMovies] = useState([]);
	const [moviesPage, setMoviesPage] = useState(1);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getTrendingMovies = async function () {
			const data = await sendHttpRequest({
				url: `${API_URL}/trending/all/week?api_key=${API_KEY}&page=${moviesPage}`,
			});
			if (!data) return;

			const foundMovies = [];

			data.results.forEach(res => {
				if (res.media_type !== "tv" && res.media_type !== "movie") return;

				const movie = {
					id: res.id,
					image: `${API_POSTER_URL}${res.poster_path}`,
					title: res.media_type === "movie" ? res.title : res.name,
					type: res.media_type === "movie" ? "Movie" : "Series",
					rating: res.vote_average,
					language: res.original_language,
					plot: res.overview,
				};
				foundMovies.push(movie);
			});

			foundMovies.forEach(async movie => {
				const url = `${API_URL}/${movie.type === "Movie" ? "movie" : "tv"}/${
					movie.id
				}?api_key=${API_KEY}`;

				const data = await sendHttpRequest({ url });
				if (!data) return;

				movie.genres = data.genres.join(", ");
				movie.runtime =
					movie.type === "Movie" ? data.runtime : data.episode_run_time;
				movie.releaseDate =
					movie.type === "Movie" ? data.release_date : data.first_air_date;
			});

			setMovies(foundMovies);
		};
		getTrendingMovies();
	}, [sendHttpRequest, moviesPage]);

	const goToPage = function (page) {
		setMoviesPage(page);
	};

	return (
		<main className={style.homepage}>
			{isLoading && <LoadingSpinner />}
			{!isLoading && error && <ErrorMessage message={error.message} />}

			{!isLoading && !error && <MoviesList movies={movies} />}
			{!isLoading && !error && (
				<Pagination
					actualPage={moviesPage}
					numPages={20}
					onChangePage={goToPage}
				/>
			)}
		</main>
	);
};

export default HomePage;
