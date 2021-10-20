import style from "./MovieItem.module.css";
import MediaCard from "../../layout/MediaCard/MediaCard";

const MovieItem = function (props) {
	return (
		<li>
			<MediaCard
				className={style["movie-item__card"]}
				image={props.image}
				alt={props.title}
			>
				<div className={style["movie-item__info-row"]}>
					<h4>{props.title}</h4>
					<div className={style["movie-item__rating"]}>{props.imdbRating}</div>
				</div>
				<div className={style["movie-item__info-row"]}>
					<p>{props.year}</p>
					<p>{props.type}</p>
				</div>
				<button type="button" className={style["movie-item__watchlist-btn"]}>
					Add to WatchList
				</button>
			</MediaCard>
		</li>
	);
};

export default MovieItem;
