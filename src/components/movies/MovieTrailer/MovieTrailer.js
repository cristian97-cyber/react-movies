import { useEffect, useState } from "react";

import style from "./MovieTrailer.module.css";
import useHttp from "../../../hooks/http";
import { API_KEY, API_URL, YOUTUBE_VIDEO_URL } from "../../../config";
import LoadingSpinner from "../../layout/LoadingSpinner/LoadingSpinner";
import Message from "../../layout/Message/Message";

const MovieTrailer = function (props) {
	const movie = props.movie;
	const country = props.country;
	const isLoadingCountry = props.isLoadingCountry;
	const countryError = props.countryError;
	const geoError = props.geoError;

	const [video, setVideo] = useState(null);
	const [noVideo, setNoVideo] = useState(false);

	const [isLoading, error, sendHttpRequest] = useHttp();

	useEffect(() => {
		const getVideo = async function () {
			if (!country && !countryError && !geoError) return;

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
		getVideo();
	}, [country, countryError, geoError, movie, sendHttpRequest]);

	return (
		<div className={style["movie-trailer"]}>
			<p>Trailer:</p>

			{(isLoading || isLoadingCountry) && (
				<LoadingSpinner className={style["movie-trailer__spinner"]} />
			)}

			{!isLoading && error && (
				<Message
					type="error"
					message={error.message}
					className={style["movie-trailer__message"]}
				/>
			)}

			{!isLoading && noVideo && (
				<Message
					type="info"
					message="Actually there are no available trailers for this movie"
					className={style["movie-trailer__message"]}
				/>
			)}

			{!isLoading && !isLoadingCountry && !error && !noVideo && (
				<div className={style["movie-trailer__video"]}>
					<iframe
						src={`${YOUTUBE_VIDEO_URL}/${video}`}
						title="TouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			)}
		</div>
	);
};

export default MovieTrailer;
