import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import style from "./Navigation.module.css";
import logo from "../../../img/logo.svg";
import icons from "../../../img/icons.svg";
import { navigationActions } from "../../../store/navigation";

const Navigation = function () {
	const showResponsiveNav = useSelector(
		state => state.navigation.showResponsiveNav
	);

	const dispatch = useDispatch();

	const toggleResponsiveNav = () =>
		dispatch(navigationActions.toggleResponsiveNav());
	const closeResponsiveNav = () =>
		dispatch(navigationActions.closeResponsiveNav());

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
				<div className={style["navigation__search"]}>
					<svg className={style["navigation__search-icon"]}>
						<use href={`${icons}#icon-search`} />
					</svg>
					<input type="text" placeholder="Search Movie" />
				</div>
				<nav className={style["navigation__nav"]}>
					<ul>
						<li>
							<NavLink
								to="/movies"
								className={style["navigation__link"]}
								activeClassName={style.active}
								exact
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
									exact
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
