import style from "./MovieDetailPage.module.css";

const MovieDetailPage = function () {
	return (
		<main className={style["movie-detail-page"]}>
			<figure className={style["movie-detail-page__image"]}>
				<img
					src="https://m.media-amazon.com/images/M/MV5BNDJjMzc4NGYtZmFmNS00YWY3LThjMzQtYzJlNGFkZGRiOWI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
					alt="Lucifer"
				/>
			</figure>
			<div className={style["movie-detail-page__info"]}>
				<p>
					<span>Title:</span> Lucifer
				</p>
				<p>
					<span>Year: </span> 2016-2021
				</p>
				<p>
					<span>Type:</span> Series
				</p>
				<p>
					<span>Rating:</span> 8.1
				</p>
				<p>
					<span>Genre:</span> Crime, Drama, Fantasy
				</p>
				<p>
					<span>Runtime:</span> Crime, Drama, Fantasy
				</p>
				<p>
					<span>Language:</span> English
				</p>
				<p>
					<span>Release date:</span> 25 Jan 2016
				</p>
				<p>
					<span>Actors:</span> Tom Ellis, Lauren German, Kevin Alejandro
				</p>
				<p>
					<span>Plot:</span> Lucifer Morningstar has decided he's had enough of
					being the dutiful servant in Hell and decides to spend some time on
					Earth to better understand humanity. He settles in Los Angeles - the
					City of Angels.
				</p>

				<div className={style["movie-detail-page__watch-on"]}>
					<p>Watch on:</p>
					<figure>
						<img
							src="https://www.justwatch.com/images/icon/207360008/s100/icon.webp"
							alt="Netflix"
						/>
					</figure>
					<figure>
						<img
							src="https://www.justwatch.com/images/icon/52449861/s100/icon.webp"
							alt="Prime Video"
						/>
					</figure>
					<figure>
						<img
							src="https://www.justwatch.com/images/icon/147638351/s100/icon.webp"
							alt="Disney Plus"
						/>
					</figure>
				</div>
			</div>
		</main>
	);
};

export default MovieDetailPage;
