import { useState, useEffect } from "react";

import style from "./ProvidersList.module.css";
import useHttp from "../../../hooks/http";
import { API_KEY, API_URL, API_POSTER_URL } from "../../../config";
import LoadingSpinner from "../../layout/LoadingSpinner/LoadingSpinner";
import Message from "../../layout/Message/Message";
import ProviderItem from "../ProviderItem/ProviderItem";

const ProvidersList = function (props) {
	const movie = props.movie;
	const country = props.country;
	const isLoadingCountry = props.isLoadingCountry;
	const countryError = props.countryError;
	const geoError = props.geoError;

	const [providers, setProviders] = useState([]);
	const [noProviders, setNoProviders] = useState(false);

	const [isLoading, error, sendHttpRequest] = useHttp();

	const providersContent = providers.map(provider => (
		<ProviderItem key={provider.id} provider={provider} />
	));

	useEffect(() => {
		const getProviders = async function () {
			if (!country) return;

			const data = await sendHttpRequest({
				url: `${API_URL}/${movie.type}/${movie.id}/watch/providers?api_key=${API_KEY}`,
			});
			if (!data) return;

			if (!data.results[country] || !data.results[country].flatrate) {
				setNoProviders(true);
				return;
			} else {
				setNoProviders(false);
			}

			const foundProviders = [];

			data.results[country].flatrate.forEach(pro => {
				const provider = {
					id: pro.provider_id,
					image: `${API_POSTER_URL}/${pro.logo_path}`,
					name: pro.provider_name,
				};
				foundProviders.push(provider);
			});

			setProviders(foundProviders);
		};
		getProviders();
	}, [country, movie, sendHttpRequest]);

	return (
		<div className={style["providers-list"]}>
			<p>Watch on:</p>

			{(isLoading || isLoadingCountry) && (
				<LoadingSpinner className={style["providers-list__spinner"]} />
			)}

			{!isLoading && countryError && (
				<Message
					type="error"
					message={countryError.message}
					className={style["providers-list__message"]}
				/>
			)}

			{!isLoading && error && (
				<Message
					type="error"
					message={error.message}
					className={style["providers-list__message"]}
				/>
			)}

			{!isLoading && geoError && (
				<Message
					type="error"
					message={geoError}
					className={style["providers-list__message"]}
				/>
			)}

			{!isLoading && noProviders && (
				<Message
					type="info"
					message="Actually there are no stream providers for this movie"
					className={style["providers-list__message"]}
				/>
			)}

			{!isLoading &&
				!isLoadingCountry &&
				!error &&
				!countryError &&
				!geoError &&
				!noProviders && <ul>{providersContent}</ul>}
		</div>
	);
};

export default ProvidersList;
