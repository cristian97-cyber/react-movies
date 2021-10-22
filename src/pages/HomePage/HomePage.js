import { useState, useEffect } from "react";

import style from "./HomePage.module.css";
import useHttp from "../../hooks/http";
import { API_URL, API_POSTER_URL, API_KEY } from "../../config";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/layout/ErrorMessage/ErrorMessage";
import MoviesList from "../../components/movies/MoviesList/MoviesList";

const HomePage = function () {
	const [movies, setMovies] = useState([]);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getTrendingMovies = async function () {
			const data = await sendHttpRequest({
				url: `${API_URL}/trending/all/week?api_key=${API_KEY}`,
			});
			if (!data) return;

			console.log(data);
			const foundMovies = [];
			data.results.forEach((res, i) => {
				if (res.media_type !== "tv" && res.media_type !== "movie") return;

				foundMovies.push({
					id: res.id,
					image: `${API_POSTER_URL}${res.poster_path}`,
					title: res.media_type === "tv" ? res.name : res.title,
					year: "2021",
					type: res.media_type === "tv" ? "Movie" : "Series",
					rating: res.vote_average,
					genre: "Comedy, Drama, Romance",
					runtime: "122 min",
					language: res.original_language,
					releaseDate: "25 Dec 2012",
					actors: "Bradley Cooper, Jennifer Lawrence, Robert De Niro",
					plot: res.overview,
				});
			});

			setMovies(foundMovies);
		};
		getTrendingMovies();
	}, [sendHttpRequest]);

	return (
		<main className={style.homepage}>
			{isLoading && <LoadingSpinner />}
			{!isLoading && error && <ErrorMessage message={error.message} />}

			{!isLoading && !error && <MoviesList movies={movies} />}

			{/* <Pagination /> */}
		</main>
	);
};

export default HomePage;
