import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import style from "./MovieItem.module.css";
import noImageIcon from "../../../img/no-image.svg";
import { watchlistActions } from "../../../store/watchlist";

const MovieItem = function (props) {
	const watchlist = useSelector(state => state.watchlist);
	const isItemInWatchlist = watchlist.totItems.some(
		item => item.id === props.id
	);

	const dispatch = useDispatch();

	const addToWatchlist = function () {
		const item = {
			id: props.id,
			image: props.image,
			title: props.title,
			rating: props.rating,
			type: props.type,
		};

		dispatch(watchlistActions.addItem(item));
	};

	const removeFromWatchlist = function () {
		dispatch(watchlistActions.removeItem(props.id));
	};

	const image = props.image || noImageIcon;

	const imageClassName = props.image
		? style["movie-item__image"]
		: style["movie-item__no-image"];

	let itemButtonContent;
	if (isItemInWatchlist) {
		itemButtonContent = (
			<button
				type="button"
				className={`${style["movie-item__btn"]} ${style["movie-item__btn--remove"]}`}
				onClick={removeFromWatchlist}
			>
				Remove from WatchList
			</button>
		);
	} else {
		itemButtonContent = (
			<button
				type="button"
				className={`${style["movie-item__btn"]} ${style["movie-item__btn--add"]}`}
				onClick={addToWatchlist}
			>
				Add to WatchList
			</button>
		);
	}

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
					{itemButtonContent}
				</div>
			</div>
		</li>
	);
};

export default MovieItem;
