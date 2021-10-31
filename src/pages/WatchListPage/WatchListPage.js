import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

import style from "./WatchListPage.module.css";
import { watchlistActions } from "../../store/watchlist";
import { navigationActions } from "../../store/navigation";
import Message from "../../components/layout/Message/Message";
import MoviesList from "../../components/movies/MoviesList/MoviesList";
import Pagination from "../../components/layout/Pagination/Pagination";

const WatchListPage = function () {
	const watchlist = useSelector(state => state.watchlist);

	const dispatch = useDispatch();

	const history = useHistory();
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const actualPage = +urlParams.get("page") || 1;

	useEffect(() => {
		dispatch(watchlistActions.setPageItems(actualPage));
	}, [actualPage, dispatch]);

	const goToPage = function (page) {
		history.push(`/watchlist?page=${page}`);
	};

	return (
		<main
			className={style["watchlist-page"]}
			onClick={() => dispatch(navigationActions.closeResponsiveNav())}
		>
			{watchlist.numItems === 0 && (
				<Message type="info" message="There are no movies in your WatchList" />
			)}

			{watchlist.numItems > 0 && <MoviesList movies={watchlist.pageItems} />}
			{watchlist.numItems > 0 && (
				<Pagination
					actualPage={actualPage}
					numPages={watchlist.totPages}
					onChangePage={goToPage}
				/>
			)}
		</main>
	);
};

export default WatchListPage;
