import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import style from "./Navigation.module.css";
import logo from "../../../img/logo.svg";
import icons from "../../../img/icons.svg";
import { navigationActions } from "../../../store/navigation";

const Navigation = function (props) {
	const showResponsiveNav = useSelector(
		state => state.navigation.showResponsiveNav
	);

	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const movieType = urlParams.get("movie-type") || "all";

	const toggleResponsiveNav = () =>
		dispatch(navigationActions.toggleResponsiveNav());

	const closeResponsiveNav = () =>
		dispatch(navigationActions.closeResponsiveNav());

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

	const navigationClassName = `${style.navigation} ${
		!showResponsiveNav ? style["navigation--shadow"] : ""
	}`;

	return (
		<>
			<header className={navigationClassName}>
				<div className={style["navigation__logo"]}>
					<img src={logo} alt="Logo" />
					<Link
						className={style["navigation__logo-link"]}
						to="/movies"
						onClick={closeResponsiveNav}
					>
						React Movies
					</Link>
				</div>
				<form className={style["navigation__search"]} onSubmit={submitHandler}>
					<svg className={style["navigation__search-icon"]}>
						<use href={`${icons}#icon-search`} />
					</svg>
					<input
						type="text"
						placeholder="Search Movie"
						value={props.query}
						onChange={searchInputChangeHandler}
					/>
				</form>
				<nav className={style["navigation__nav"]}>
					<ul>
						<li>
							<NavLink
								to="/movies"
								className={style["navigation__link"]}
								activeClassName={style.active}
								onClick={closeResponsiveNav}
							>
								Movies
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/watchlist"
								className={style["navigation__link"]}
								activeClassName={style.active}
								exact
								onClick={closeResponsiveNav}
							>
								WatchList
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className={style["navigation__responsive-icon"]}>
					<svg onClick={toggleResponsiveNav}>
						<use
							href={`${icons}#${
								showResponsiveNav ? "icon-clear" : "icon-view-list"
							}`}
						/>
					</svg>
				</div>
			</header>
			<CSSTransition
				in={showResponsiveNav}
				timeout={300}
				mountOnEnter
				unmountOnExit
				classNames={{
					enter: style["navigation__animation-enter"],
					enterActive: style["navigation__animation-enter-active"],
					exit: style["navigation__animation-exit"],
					exitActive: style["navigation__animation-exit-active"],
				}}
			>
				<div className={style["navigation__responsive"]}>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/movies"
									className={style["navigation__link"]}
									activeClassName={style.active}
									onClick={closeResponsiveNav}
								>
									Movies
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/watchlist"
									className={style["navigation__link"]}
									activeClassName={style.active}
									exact
									onClick={closeResponsiveNav}
								>
									WatchList
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</CSSTransition>
		</>
	);
};

export default Navigation;
