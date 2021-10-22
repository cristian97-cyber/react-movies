import style from "./LoadingSpinner.module.css";
import icons from "../../../img/icons.svg";

const LoadingSpinner = function () {
	return (
		<div className={style["loading-spinner"]}>
			<svg>
				<use href={`${icons}#icon-spinner2`} />
			</svg>
		</div>
	);
};

export default LoadingSpinner;
