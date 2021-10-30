import { useEffect, useState } from "react";

import style from "./MovieDetail.module.css";
import noImageIcon from "../../../img/no-image.svg";
import useHttp from "../../../hooks/http";
import { GEOCODING_API_URL } from "../../../config";
import ProvidersList from "../../providers/ProvidersList/ProvidersList";
import MovieTrailer from "../MovieTrailer/MovieTrailer";

const MovieDetail = function (props) {
	const movie = props.movie;

	const [country, setCountry] = useState(null);
	const [geoError, setGeoError] = useState("");

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
			setGeoError("Geolocation is not supported by your browser");
			return;
		}

		navigator.geolocation.getCurrentPosition(success, error);
	}, [sendHttpRequest]);

	return (
		<div className={style["movie-detail"]}>
			<div className={style["movie-detail__card"]}>
				<figure className={figureClassName}>
					<img src={image} alt={movie.title} />
				</figure>
				<div className={style["movie-detail__card-actions"]}>
					<button type="button" className={style["movie-detail__btn"]}>
						Add to WatchList
					</button>
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

				<ProvidersList
					movie={movie}
					country={country}
					isLoadingCountry={isLoading}
					countryError={error}
					geoError={geoError}
				/>

				<MovieTrailer
					movie={movie}
					country={country}
					isLoadingCountry={isLoading}
					countryError={error}
					geoError={geoError}
				/>
			</div>
		</div>
	);
};

export default MovieDetail;
