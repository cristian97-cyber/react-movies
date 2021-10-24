import style from "./Message.module.css";
import icons from "../../../img/icons.svg";

const Message = function (props) {
	const classNames = `${style.message} ${
		props.type === "info" ? style["message--info"] : style["message--error"]
	}`;

	const messageIcon = `${icons}#${
		props.type === "info" ? "icon-info_outline" : "icon-error_outline"
	}`;

	return (
		<div className={classNames}>
			<svg>
				<use href={messageIcon} />
			</svg>
			<p>{props.message}</p>
		</div>
	);
};

export default Message;
