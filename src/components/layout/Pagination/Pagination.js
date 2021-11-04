import style from "./Pagination.module.css";
import icons from "../../../img/icons.svg";

const Pagination = function (props) {
	const numPagItems = 7;

	const paginationNumbers = [];
	for (let i = 0; i < numPagItems; i++) {
		if (props.numPages <= 7) {
			if (i < props.numPages) {
				paginationNumbers.push(i + 1);
				continue;
			} else {
				break;
			}
		}

		switch (i) {
			case 0:
				paginationNumbers.push(i + 1);
				break;
			case 1:
				if (props.actualPage < 5) paginationNumbers.push(i + 1);
				else paginationNumbers.push(-1);
				break;
			case 2:
				if (props.actualPage < 5) {
					paginationNumbers.push(i + 1);
				} else if (props.actualPage >= props.numPages - 2) {
					paginationNumbers.push(props.numPages - 4);
				} else {
					paginationNumbers.push(props.actualPage - 1);
				}
				break;
			case 3:
				if (props.actualPage < 5) {
					paginationNumbers.push(i + 1);
				} else if (props.actualPage >= props.numPages - 3) {
					paginationNumbers.push(props.numPages - 3);
				} else {
					paginationNumbers.push(props.actualPage);
				}
				break;
			case 4:
				if (props.actualPage < 5) {
					paginationNumbers.push(i + 1);
				} else if (props.actualPage >= props.numPages - 3) {
					paginationNumbers.push(props.numPages - 2);
				} else {
					paginationNumbers.push(props.actualPage + 1);
				}
				break;
			case 5:
				if (props.actualPage >= props.numPages - 3) {
					paginationNumbers.push(props.numPages - 1);
				} else {
					paginationNumbers.push(-2);
				}
				break;
			case 6:
				paginationNumbers.push(props.numPages);
				break;
			default:
				break;
		}
	}

	const movePage = function (num) {
		if (num === 0 || num > props.numPages) return;

		props.onChangePage(num);
	};

	const paginationItems = paginationNumbers.map(num => {
		if (num < 0) {
			return (
				<div key={num} className={style["pagination__dots"]}>
					...
				</div>
			);
		}

		const className = `${style["pagination__item"]} ${
			num === props.actualPage ? style["pagination__item--active"] : ""
		}`;

		return (
			<div key={num} className={className} onClick={() => movePage(num)}>
				{num}
			</div>
		);
	});

	const chevronLeftClassName = `${
		props.actualPage === 1
			? style["pagination__chevron--disabled"]
			: style["pagination__chevron--enabled"]
	}`;

	const chevronRightClassName = `${
		props.actualPage === props.numPages
			? style["pagination__chevron--disabled"]
			: style["pagination__chevron--enabled"]
	}`;

	return (
		<div className={style.pagination}>
			<svg
				className={chevronLeftClassName}
				onClick={() => movePage(props.actualPage - 1)}
			>
				<use href={`${icons}#icon-navigate_before`}></use>
			</svg>
			{paginationItems}
			<svg
				className={chevronRightClassName}
				onClick={() => movePage(props.actualPage + 1)}
			>
				<use href={`${icons}#icon-navigate_next`}></use>
			</svg>
		</div>
	);
};

export default Pagination;
