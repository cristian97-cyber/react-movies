import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import style from "./MediaCard.module.css";
import noImageIcon from "../../../img/no-image.svg";

const MediaCard = function (props) {
	const image = props.image || noImageIcon;

	const imageClassName = props.image
		? style["media-card__image"]
		: style["media-card__no-image"];

	return (
		<div className={`${style["media-card"]} ${props.className}`}>
			<Link to={`/${props.destination}`}>
				<figure className={style["media-card__figure"]}>
					<LazyLoadImage
						alt={props.alt}
						width="100%"
						height="100%"
						src={image}
						effect="opacity"
						className={imageClassName}
					/>
				</figure>
			</Link>

			<div className={style["media-card__content"]}>{props.children}</div>
		</div>
	);
};

export default MediaCard;
