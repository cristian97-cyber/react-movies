import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import style from "./MediaCard.module.css";

const MediaCard = function (props) {
	return (
		<div className={`${style["media-card"]} ${props.className}`}>
			<Link to={`/${props.destination}`}>
				<figure className={style["media-card__figure"]}>
					<LazyLoadImage
						alt={props.alt}
						width="100%"
						height="100%"
						src={props.image}
						effect="opacity"
					/>
				</figure>
			</Link>

			<div className={style["media-card__content"]}>{props.children}</div>
		</div>
	);
};

export default MediaCard;
