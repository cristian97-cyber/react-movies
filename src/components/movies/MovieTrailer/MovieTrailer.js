import style from "./MovieTrailer.module.css";
import { YOUTUBE_VIDEO_URL } from "../../../config";
import Message from "../../layout/Message/Message";

const MovieTrailer = function (props) {
	const video = props.video;
	const noVideo = props.noVideo;
	const error = props.error;

	return (
		<div className={style["movie-trailer"]}>
			<p>Trailer:</p>

			{error && (
				<Message
					type="error"
					message={error.message}
					className={style["movie-trailer__message"]}
				/>
			)}

			{noVideo && (
				<Message
					type="info"
					message="Actually there are no available trailers for this movie"
					className={style["movie-trailer__message"]}
				/>
			)}

			{!error && !noVideo && (
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
