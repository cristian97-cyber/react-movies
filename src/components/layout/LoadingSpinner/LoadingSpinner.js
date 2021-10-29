import style from "./LoadingSpinner.module.css";
import icons from "../../../img/icons.svg";

const LoadingSpinner = function (props) {
	const className = `${style["loading-spinner"]} ${props.className}`;

	return (
		<div className={className}>
			<svg>
				<use href={`${icons}#icon-spinner2`} />
			</svg>
		</div>
	);
};

export default LoadingSpinner;
