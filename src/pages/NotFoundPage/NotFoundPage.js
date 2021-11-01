import { Link, useHistory } from "react-router-dom";

import style from "./NotFoundPage.module.css";
import logo from "../../img/logo.svg";
import contentImage from "../../img/not-found.png";

const NotFoundPage = function () {
	const history = useHistory();

	const returnToMovies = function () {
		history.push("/movies");
	};

	return (
		<main className={style["not-found-page"]}>
			<div className={style["not-found-page__top"]}>
				<div className={style["not-found-page__logo"]}>
					<img src={logo} alt="Logo" />
					<Link className={style["not-found-page__logo-link"]} to="/movies">
						React Movies
					</Link>
				</div>
			</div>
			<div className={style["not-found-page__content"]}>
				<img src={contentImage} alt="Not found" />
				<h1>Page not found</h1>
				<p>The page you're looking for does not exist.</p>
				<button type="button" onClick={returnToMovies}>
					Return to Movies
				</button>
			</div>
		</main>
	);
};

export default NotFoundPage;
