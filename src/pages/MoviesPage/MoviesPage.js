import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import style from "./MoviesPage.module.css";
import useHttp from "../../hooks/http";
import { API_URL, API_POSTER_URL, API_KEY } from "../../config";
import { navigationActions } from "../../store/navigation";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import Message from "../../components/layout/Message/Message";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";
import { createMoviesUrl } from "../../helpers";

const MoviesPage = function (props) {
	const genres = useSelector(state => state.genres);

	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const searchQuery = urlParams.get("search") || "";
	const actualPage = +urlParams.get("page") || 1;
	const movieType = urlParams.get("movie-type") || "all";
	const movieGenre = +urlParams.get("movie-genre") || "all";

	const [movies, setMovies] = useState([]);
	const [noMovies, setNoMovies] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const setData = async function (url) {
			const data = await sendHttpRequest({ url });
			if (!data) return;

			const foundMovies = [];

			data.results.forEach(res => {
				const movie = {
					id: res.id,
					image: res.poster_path && `${API_POSTER_URL}${res.poster_path}`,
					title: res.title || res.name,
					rating: res.vote_average,
					type: (movieType !== "all" && movieType) || res.media_type,
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

		const getSpecificMovies = async function () {
			if (movieGenre === "all") {
				const searchType = movieType === "all" ? "multi" : movieType;
				const url = `${API_URL}/search/${searchType}?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${actualPage}&include_adult=false`;
				await setData(url);
			}

			if (movieGenre !== "all") {
				const url = `${API_URL}/discover/${movieType}?api_key=${API_KEY}&language=en-US&with_genres=${movieGenre}&sort_by=popularity.desc&page=${actualPage}`;
				await setData(url);
			}
		};

		const getTrendingMovies = async function () {
			const url = `${API_URL}/trending/${movieType}/week?api_key=${API_KEY}&page=${actualPage}`;
			await setData(url);
		};

		if (searchQuery || movieGenre !== "all") getSpecificMovies();
		else getTrendingMovies();
	}, [searchQuery, movieType, movieGenre, actualPage, sendHttpRequest]);

	const goToPage = function (page) {
		const url = createMoviesUrl(searchQuery, movieType, movieGenre, page);
		history.push(url);
	};

	const changeMovieType = function (e) {
		const url = createMoviesUrl(searchQuery, e.target.value, "all");
		history.push(url);
	};

	const changeMovieGenre = function (e) {
		const url = createMoviesUrl("", movieType, e.target.value);
		history.push(url);
	};

	return (
		<main
			className={style["movies-page"]}
			onClick={() => dispatch(navigationActions.closeResponsiveNav())}
		>
			<div className={style["movies-page__top"]}>
				<div className={style["movies-page__select-type"]}>
					<label htmlFor="movie-type">Type</label>
					<select id="movie-type" value={movieType} onChange={changeMovieType}>
						<option value="all">All</option>
						<option value="movie">Movies</option>
						<option value="tv">Series</option>
					</select>
				</div>

				{movieType !== "all" && !props.isLoadingGenres && !props.genresError && (
					<div className={style["movies-page__select-genre"]}>
						<label htmlFor="movie-genres">Genre</label>
						<select
							id="movie-genres"
							value={movieGenre}
							onChange={changeMovieGenre}
						>
							<option value="all">All</option>
							{genres[movieType].map(gen => (
								<option key={gen.id} value={gen.id}>
									{gen.name}
								</option>
							))}
						</select>
					</div>
				)}
			</div>

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
