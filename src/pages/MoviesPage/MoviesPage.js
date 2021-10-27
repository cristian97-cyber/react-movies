import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import style from "./MoviesPage.module.css";
import useHttp from "../../hooks/http";
import { API_URL, API_POSTER_URL, API_KEY } from "../../config";
import { navigationActions } from "../../store/navigation";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import Message from "../../components/layout/Message/Message";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";

const MoviesPage = function () {
	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);

	const [movies, setMovies] = useState([]);
	const [noMovies, setNoMovies] = useState(false);
	const [actualPage, setActualPage] = useState(+urlParams.get("page") || 1);
	const [totalPages, setTotalPages] = useState(0);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getTrendingMovies = async function () {
			const data = await sendHttpRequest({
				url: `${API_URL}/trending/all/week?api_key=${API_KEY}&page=${actualPage}`,
			});
			if (!data) return;

			const foundMovies = [];

			data.results.forEach(res => {
				if (res.media_type !== "movie" && res.media_type !== "tv") return;

				const movie = {
					id: res.id,
					image: `${API_POSTER_URL}${res.poster_path}`,
					title: res.title || res.name,
					type: res.media_type,
					rating: res.vote_average,
					language: res.original_language,
					plot: res.overview,
				};
				foundMovies.push(movie);
			});
			setTotalPages(data.total_pages);

			if (foundMovies.length === 0) {
				setNoMovies(true);
				return;
			} else {
				setNoMovies(false);
			}

			foundMovies.forEach(async movie => {
				const url = `${API_URL}/${movie.type}/${movie.id}?api_key=${API_KEY}`;
				const data = await sendHttpRequest({ url });
				if (!data) return;

				movie.genres = data.genres;
				movie.runtime = data.runtime || data.episode_run_time;
				movie.releaseDate = data.release_date || data.first_air_date;
			});

			setMovies(foundMovies);
		};
		getTrendingMovies();
	}, [actualPage, sendHttpRequest]);

	const goToPage = function (page) {
		history.push(`${location.pathname}?page=${page}`);
		setActualPage(page);
	};

	return (
		<main
			className={style["movies-page"]}
			onClick={() => dispatch(navigationActions.closeResponsiveNav())}
		>
			{isLoading && <LoadingSpinner />}

			{!isLoading && error && <Message type="error" message={error.message} />}
			{!isLoading && !error && noMovies && (
				<Message type="info" message="There are no data" />
			)}

			{!isLoading && !error && !noMovies && <MoviesList movies={movies} />}
			{!isLoading && !error && !noMovies && (
				<Pagination
					actualPage={actualPage}
					numPages={totalPages}
					onChangePage={goToPage}
				/>
			)}
		</main>
	);
};

export default MoviesPage;
