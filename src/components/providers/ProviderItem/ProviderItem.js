import style from "./ProviderItem.module.css";

const ProviderItem = function (props) {
	const provider = props.provider;

	return (
		<li className={style["provider-item"]}>
			<figure>
				<img src={provider.image} alt={provider.title} title={provider.name} />
			</figure>
		</li>
	);
};

export default ProviderItem;
