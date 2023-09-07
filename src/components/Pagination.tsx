import PaginationButton from "./PaginatonButton";

type PaginationProps = {
	totalPages: number;
	currentPage: number;
	maxVisibleButtons: number;
	handleQueryPageNumber: (pageNum: number) => void;
};

const Pagination = ({
	totalPages,
	currentPage,
	maxVisibleButtons,
	handleQueryPageNumber,
}: PaginationProps) => {
	const showPageButtons = () => {
		const pageButtons: JSX.Element[] = [];

		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - Math.floor(maxVisibleButtons / 2) &&
					i <= currentPage + Math.floor(maxVisibleButtons / 2))
			) {
				pageButtons.push(
					<PaginationButton
						key={i}
						onClick={() => handleQueryPageNumber(i)}
						isActive={i === currentPage}
						label={i}
					/>
				);
			} else if (
				(i === currentPage - Math.floor(maxVisibleButtons / 2) - 1 &&
					currentPage - Math.floor(maxVisibleButtons / 2) > 2) ||
				(i === currentPage + Math.floor(maxVisibleButtons / 2) + 1 &&
					currentPage + Math.floor(maxVisibleButtons / 2) < totalPages - 1)
			) {
				pageButtons.push(
					<span className="text-primary text-2xl" key={`ellipsis-${i}`}>
						...
					</span>
				);
			}
		}

		return pageButtons;
	};

	return <div className="flex space-x-4 items-center">{showPageButtons()}</div>;
};

export default Pagination;
