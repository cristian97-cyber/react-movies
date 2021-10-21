import { Link } from "react-router-dom";

import style from "./MediaCard.module.css";

const MediaCard = function (props) {
	return (
		<div className={`${style["media-card"]} ${props.className}`}>
			<Link to={props.destination}>
				<figure className={style["media-card__figure"]}>
					<img src={props.image} alt={props.alt} />
				</figure>
			</Link>

			<div className={style["media-card__content"]}>{props.children}</div>
		</div>
	);
};

export default MediaCard;
