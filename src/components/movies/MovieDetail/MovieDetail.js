import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import style from "./MovieDetail.module.css";
import noImageIcon from "../../../img/no-image.svg";
import useHttp from "../../../hooks/http";
import {
	API_URL,
	API_KEY,
	GEOCODING_API_URL,
	API_POSTER_URL,
} from "../../../config";
import { watchlistActions } from "../../../store/watchlist";
import LoadingSpinner from "../../layout/LoadingSpinner/LoadingSpinner";
import ProvidersList from "../../providers/ProvidersList/ProvidersList";
import MovieTrailer from "../MovieTrailer/MovieTrailer";

const MovieDetail = function (props) {
	const movie = props.movie;

	const watchlist = useSelector(state => state.watchlist);
	const isItemInWatchlist = watchlist.totItems.some(
		item => item.id === movie.id
	);

	const dispatch = useDispatch();

	const [country, setCountry] = useState(null);
	const [geoError, setGeoError] = useState("");
	const [providers, setProviders] = useState([]);
	const [noProviders, setNoProviders] = useState(false);
	const [video, setVideo] = useState(null);
	const [noVideo, setNoVideo] = useState(false);

	const addToWatchlist = function () {
		const item = {
			id: movie.id,
			image: movie.image,
			title: movie.title,
			rating: movie.rating,
			type: movie.type,
		};

		dispatch(watchlistActions.addItem(item));
	};

	const removeFromWatchlist = function () {
		dispatch(watchlistActions.removeItem(movie.id));
	};

	let itemButtonContent;
	if (isItemInWatchlist) {
		itemButtonContent = (
			<button
				type="button"
				className={`${style["movie-detail__btn"]} ${style["movie-detail__btn--remove"]}`}
				onClick={removeFromWatchlist}
			>
				Remove from WatchList
			</button>
		);
	} else {
		itemButtonContent = (
			<button
				type="button"
				className={`${style["movie-detail__btn"]} ${style["movie-detail__btn--add"]}`}
				onClick={addToWatchlist}
			>
				Add to WatchList
			</button>
		);
	}

	const image = movie.image || noImageIcon;

	const figureClassName = movie.image
		? style["movie-detail__card-figure"]
		: style["movie-detail__card-figure--no-image"];

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const success = async function (pos) {
			const data = await sendHttpRequest({
				url: `${GEOCODING_API_URL}?latitude=${pos.latitude}&longitude=${pos.longitude}`,
			});
			if (!data) return;

			setCountry(data.countryCode);
		};

		const error = () => setGeoError("Unable to retrieve your location");

		if (!navigator.geolocation) {
			setGeoError("Unable to retrieve your location");
			return;
		}

		navigator.geolocation.getCurrentPosition(success, error);
	}, [sendHttpRequest]);

	useEffect(() => {
		const getProviders = async function () {
			if (!country) return;

			const data = await sendHttpRequest({
				url: `${API_URL}/${movie.type}/${movie.id}/watch/providers?api_key=${API_KEY}`,
			});
			if (!data) return;

			if (!data.results[country] || !data.results[country].flatrate) {
				setNoProviders(true);
				return;
			} else {
				setNoProviders(false);
			}

			const foundProviders = [];

			data.results[country].flatrate.forEach(pro => {
				const provider = {
					id: pro.provider_id,
					image: `${API_POSTER_URL}/${pro.logo_path}`,
					name: pro.provider_name,
				};
				foundProviders.push(provider);
			});

			setProviders(foundProviders);
		};

		const getVideo = async function () {
			if (!country && !error && !geoError) return;

			const data = await sendHttpRequest({
				url: `${API_URL}/${movie.type}/${
					movie.id
				}/videos?api_key=${API_KEY}&language=${country || "en-US"}`,
			});
			if (!data) return;

			if (data.results.length === 0) {
				setNoVideo(true);
				return;
			} else {
				setNoVideo(false);
			}

			for (const foundVideo of data.results) {
				if (foundVideo.site === "YouTube") {
					setVideo(foundVideo.key);
					return;
				}
			}

			setNoVideo(true);
		};

		getProviders();
		getVideo();
	}, [country, error, geoError, movie, sendHttpRequest]);

	return (
		<div className={style["movie-detail"]}>
			<div className={style["movie-detail__card"]}>
				<figure className={figureClassName}>
					<img src={image} alt={movie.title} />
				</figure>
				<div className={style["movie-detail__card-actions"]}>
					{itemButtonContent}
				</div>
			</div>

			<div className={style["movie-detail__info"]}>
				<p>
					<span>Title: </span> {movie.title}
				</p>
				<p>
					<span>Release date: </span> {movie.releaseDate || "N/A"}
				</p>
				<p>
					<span>Type: </span> {movie.type === "movie" ? "Movie" : "Series"}
				</p>
				<p>
					<span>Genres: </span>{" "}
					{(movie.genres &&
						movie.genres.length > 0 &&
						movie.genres.map(genre => genre.name).join(", ")) ||
						"N/A"}
				</p>
				<p>
					<span>{movie.type === "movie" ? "Runtime" : "Episode runtime"}:</span>{" "}
					{(movie.runtime &&
						typeof movie.runtime === "number" &&
						`${movie.runtime} min`) ||
						"N/A"}
				</p>
				<p>
					<span>Spoken languages: </span>{" "}
					{(movie.languages &&
						movie.languages.length > 0 &&
						`${movie.languages.map(lang => lang.english_name).join(", ")}`) ||
						"N/A"}
				</p>
				<p>
					<span>Plot: </span> {movie.plot || "N/A"}
				</p>
				<p>
					<span>Rating: </span> {movie.rating}
				</p>

				{isLoading && (
					<LoadingSpinner className={style["movie-detail__spinner"]} />
				)}

				{!isLoading && (
					<ProvidersList
						providers={providers}
						noProviders={noProviders}
						error={error}
						geoError={geoError}
					/>
				)}

				{!isLoading && (
					<MovieTrailer video={video} noVideo={noVideo} error={error} />
				)}
			</div>
		</div>
	);
};

export default MovieDetail;
