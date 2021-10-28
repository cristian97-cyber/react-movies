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
	const searchQuery = urlParams.get("search") || "";
	const actualPage = +urlParams.get("page") || 1;

	const [movies, setMovies] = useState([]);
	const [noMovies, setNoMovies] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getMovies = async function () {
			const url = searchQuery
				? `${API_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${actualPage}&include_adult=false`
				: `${API_URL}/trending/all/week?api_key=${API_KEY}&page=${actualPage}`;

			const data = await sendHttpRequest({ url });
			if (!data) return;

			const foundMovies = [];

			data.results.forEach(res => {
				if (res.media_type !== "movie" && res.media_type !== "tv") return;

				const movie = {
					id: res.id,
					image: res.poster_path && `${API_POSTER_URL}${res.poster_path}`,
					title: res.title || res.name,
					rating: res.vote_average,
					type: res.media_type,
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

			setMovies(foundMovies);
		};
		getMovies();
	}, [searchQuery, actualPage, sendHttpRequest]);

	const goToPage = function (page) {
		if (searchQuery) history.push(`/movies?search=${searchQuery}&page=${page}`);
		else history.push(`/movies?page=${page}`);
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
