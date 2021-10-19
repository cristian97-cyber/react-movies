import { Link, NavLink } from "react-router-dom";

import style from "./Navigation.module.css";
import logo from "../../../img/logo.svg";
import icons from "../../../img/icons.svg";

const Navigation = function () {
	return (
		<header className={style.navigation}>
			<div className={style["navigation__logo"]}>
				<img src={logo} alt="Logo" />
				<Link className={style["navigation__logo-link"]} to="/">
					React Movies
				</Link>
			</div>
			<div className={style["navigation__search"]}>
				<svg className={style["navigation__search-icon"]}>
					<use href={`${icons}#icon-search`} />
				</svg>
				<input type="text" placeholder="Search Movie" />
			</div>
			<nav>
				<ul className={style["navigation__nav"]}>
					<li>
						<NavLink
							to="/"
							className={style["navigation__link"]}
							activeClassName={style.active}
							exact
						>
							Home
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
		</header>
	);
};

export default Navigation;
