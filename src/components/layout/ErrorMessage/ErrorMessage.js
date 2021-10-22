import style from "./ErrorMessage.module.css";
import icons from "../../../img/icons.svg";

const ErrorMessage = function (props) {
	return (
		<div className={style["error-message"]}>
			<svg>
				<use href={`${icons}#icon-error_outline`} />
			</svg>
			<p>{props.message}</p>
		</div>
	);
};

export default ErrorMessage;
