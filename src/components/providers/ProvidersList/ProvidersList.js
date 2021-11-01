import style from "./ProvidersList.module.css";
import Message from "../../layout/Message/Message";
import ProviderItem from "../ProviderItem/ProviderItem";

const ProvidersList = function (props) {
	const providers = props.providers;
	const noProviders = props.noProviders;
	const error = props.error;
	const geoError = props.geoError;

	const providersContent = providers.map(provider => (
		<ProviderItem key={provider.id} provider={provider} />
	));

	return (
		<div className={style["providers-list"]}>
			<p>Watch on:</p>

			{error && (
				<Message
					type="error"
					message={error.message}
					className={style["providers-list__message"]}
				/>
			)}

			{geoError && (
				<Message
					type="error"
					message={geoError}
					className={style["providers-list__message"]}
				/>
			)}

			{noProviders && (
				<Message
					type="info"
					message="Actually there are no stream providers for this movie"
					className={style["providers-list__message"]}
				/>
			)}

			{!error && !geoError && !noProviders && <ul>{providersContent}</ul>}
		</div>
	);
};

export default ProvidersList;
