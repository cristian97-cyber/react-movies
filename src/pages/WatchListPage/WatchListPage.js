import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import style from "./WatchListPage.module.css";
import { watchlistActions } from "../../store/watchlist";
import { navigationActions } from "../../store/navigation";
import Message from "../../components/layout/Message/Message";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";

let firstRender = true;

const WatchListPage = function () {
	const watchlist = useSelector(state => state.watchlist);

	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const actualPage = +urlParams.get("page") || 1;

	useEffect(() => {
		dispatch(watchlistActions.setPageItems(actualPage));
	}, [watchlist.totItems, actualPage, dispatch]);

	useEffect(() => {
		if (firstRender) {
			firstRender = false;
			return;
		}

		if (watchlist.numPages === 0) {
			history.replace(`/watchlist`);
			return;
		}

		if (watchlist.numPages < actualPage) {
			history.replace(`/watchlist?page=${actualPage - 1}`);
		}
	}, [watchlist.numPages, actualPage, history]);

	const goToPage = function (page) {
		history.push(`/watchlist?page=${page}`);
	};

	const clearWatchlist = function () {
		dispatch(watchlistActions.clear());
	};

	return (
		<main
			className={style["watchlist-page"]}
			onClick={() => dispatch(navigationActions.closeResponsiveNav())}
		>
			{watchlist.numItems === 0 && (
				<Message type="info" message="There are no movies in your WatchList" />
			)}

			{watchlist.numItems > 0 && (
				<div className={style["watchlist-page__top"]}>
					<button type="button" onClick={clearWatchlist}>
						Clear WatchList
					</button>
				</div>
			)}
			{watchlist.numItems > 0 && <MoviesList movies={watchlist.pageItems} />}
			{watchlist.numItems > 0 && (
				<Pagination
					actualPage={actualPage}
					numPages={watchlist.numPages}
					onChangePage={goToPage}
				/>
			)}
		</main>
	);
};

export default WatchListPage;
