import style from "./SearchMovie.module.css";
import icons from "../../../img/icons.svg";

const SearchMovie = function () {
	return (
		<div className={style["search-movie"]}>
			<svg className={style["search-movie__icon"]}>
				<use href={`${icons}#icon-search`} />
			</svg>
			<input type="text" placeholder="Search Movie" />
		</div>
	);
};

export default SearchMovie;
