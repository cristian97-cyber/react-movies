import style from "./MediaCard.module.css";

const MediaCard = function (props) {
	return (
		<div className={`${style["media-card"]} ${props.className}`}>
			<figure className={style["media-card__figure"]}>
				<img src={props.image} alt={props.altText} />
			</figure>
			<div className={style["media-card__content"]}>{props.children}</div>
		</div>
	);
};

export default MediaCard;
