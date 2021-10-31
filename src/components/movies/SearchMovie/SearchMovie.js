import { useHistory } from "react-router";

import style from "./SearchMovie.module.css";
import icons from "../../../img/icons.svg";

const SearchMovie = function (props) {
	const history = useHistory();

	const searchInputChangeHandler = function (e) {
		props.onChangeQuery(e.target.value);
	};

	const submitHandler = function (e) {
		e.preventDefault();

		if (props.query) history.push(`/movies?search=${props.query}`);
		else history.push("/movies");
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
