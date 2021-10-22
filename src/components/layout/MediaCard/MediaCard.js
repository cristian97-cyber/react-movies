import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import style from "./MediaCard.module.css";

const MediaCard = function (props) {
	const imageRef = useRef();

	useEffect(() => {
		imageRef.current.src = props.image;
	}, []);

	return (
		<div className={`${style["media-card"]} ${props.className}`}>
			<Link to={props.destination}>
				<figure className={style["media-card__figure"]}>
					<img src="sd.jpg" alt={props.alt} ref={imageRef} />
				</figure>
			</Link>

			<div className={style["media-card__content"]}>{props.children}</div>
		</div>
	);
};

export default MediaCard;
