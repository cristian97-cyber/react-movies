const createMoviesUrl = function (searchQuery, movieType, movieGenre, page) {
	const searchParam = searchQuery ? `search=${searchQuery}` : "";

	const movieTypeParam = searchQuery
		? `&movie-type=${movieType}`
		: `movie-type=${movieType}`;

	const movieGenreParam =
		movieGenre !== "all" ? `&movie-genre=${movieGenre}` : "";

	const pageParam = page ? `&page=${page}` : "";

	return `/movies?${searchParam}${movieTypeParam}${movieGenreParam}${pageParam}`;
};

export { createMoviesUrl };
