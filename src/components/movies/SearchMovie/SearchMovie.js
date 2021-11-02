import { useHistory, useLocation } from "react-router";

import style from "./SearchMovie.module.css";
import icons from "../../../img/icons.svg";

const SearchMovie = function (props) {
	const history = useHistory();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const movieType = urlParams.get("movie-type") || "all";

	const searchInputChangeHandler = function (e) {
		props.onChangeQuery(e.target.value);
	};

	const submitHandler = function (e) {
		e.preventDefault();

		const searchParam = props.query ? `search=${props.query}` : "";

		const movieTypeParam = props.query
			? `&movie-type=${movieType}`
			: `movie-type=${movieType}`;

		history.push(`/movies?${searchParam}${movieTypeParam}`);
	};

	return (
		<form className={style["search-movie"]} onSubmit={submitHandler}>
			<svg className={style["search-movie__icon"]}>
				<use href={`${icons}#icon-search`} />
			</svg>
			<input
				type="text"
				placeholder="Search Movie"
				value={props.query}
				onChange={searchInputChangeHandler}
			/>
		</form>
	);
};

export default SearchMovie;
