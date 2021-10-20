import style from "./Pagination.module.css";
import icons from "../../../img/icons.svg";

const Pagination = function () {
	return (
		<div className={style.pagination}>
			<svg
				className={`${style["pagination__chevron"]} ${style["pagination__chevron--disabled"]}`}
			>
				<use href={`${icons}#icon-navigate_before`}></use>
			</svg>

			<div
				className={`${style["pagination__item"]} ${style["pagination__item--active"]}`}
			>
				1
			</div>
			<div className={style["pagination__item"]}>2</div>
			<div className={style["pagination__item"]}>3</div>
			<div className={style["pagination__item"]}>4</div>
			<div className={style["pagination__item"]}>5</div>
			<div className={style["pagination__dots"]}>...</div>
			<div className={style["pagination__item"]}>10</div>

			<svg
				className={`${style["pagination__chevron"]} ${style["pagination__chevron--enabled"]}`}
			>
				<use href={`${icons}#icon-navigate_next`}></use>
			</svg>
		</div>
	);
};

export default Pagination;
