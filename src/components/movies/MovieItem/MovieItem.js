import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import style from "./MovieItem.module.css";
import noImageIcon from "../../../img/no-image.svg";

const MovieItem = function (props) {
	const image = props.image || noImageIcon;

	const imageClassName = props.image
		? style["movie-item__image"]
		: style["movie-item__no-image"];

	return (
		<li>
			<div className={style["movie-item__card"]}>
				<Link to={`/movies/${props.type}/${props.id}`}>
					<figure className={style["movie-item__figure"]}>
						<LazyLoadImage
							alt={props.title}
							width="100%"
							height="100%"
							src={image}
							effect="opacity"
							className={imageClassName}
						/>
					</figure>
				</Link>

				<div className={style["movie-item__content"]}>
					<div className={style["movie-item__info-row"]}>
						<h4>{props.title}</h4>
						<div className={style["movie-item__rating"]}>{props.rating}</div>
					</div>
					<div className={style["movie-item__info-item"]}>
						<p>{props.type === "movie" ? "Movie" : "Series"}</p>
					</div>
					<button type="button" className={style["movie-item__btn"]}>
						Add to WatchList
					</button>
				</div>
			</div>
		</li>
	);
};

export default MovieItem;
