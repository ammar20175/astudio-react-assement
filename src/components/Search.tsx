import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
	HiOutlineSortAscending,
	HiOutlineSortDescending,
} from "react-icons/hi";

type SortingField = {
	field: string;
	label: string;
};

type SearchProps = {
	pageSizeOptions: number[];
	onPageSizeChange: (pageSize: number) => void;
	onSearch: (searchText: string) => void;
	onSortChange: (sortField: any, sortOrder: "asc" | "desc") => void;
	sortingFields: SortingField[];
	initialSortField: string;
	initialSortOrder: "asc" | "desc";
	placeHolder: string;
};

function Search({
	pageSizeOptions,
	onPageSizeChange,
	onSearch,
	onSortChange,
	sortingFields,
	initialSortField,
	initialSortOrder,
	placeHolder,
}: SearchProps) {
	const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
	const [searchText, setSearchText] = useState<string>("");
	const [sortField, setSortField] = useState<string>(initialSortField);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder);

	const handlePageSizeChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedPageSize = parseInt(event.target.value, 10);
		setPageSize(selectedPageSize);
		onPageSizeChange(selectedPageSize);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchText = event.target.value;
		setSearchText(newSearchText);
		onSearch(newSearchText);
	};

	const handleSortFieldChange = (field: string) => {
		if (field === sortField) {
			const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
			setSortOrder(newSortOrder);
			onSortChange(field, newSortOrder);
		} else {
			setSortField(field);
			setSortOrder("asc");
			onSortChange(field, "asc");
		}
	};

	return (
		<div className="flex items-center justify-between p-4 text-kblack">
			<div className="flex items-center space-x-4">
				<label htmlFor="pageSize">Entries Per Page:</label>
				<select
					id="pageSize"
					name="pageSize"
					value={pageSize}
					onChange={handlePageSizeChange}
					className="px-2 py-1 border rounded-md"
				>
					{pageSizeOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>

				<div className="flex items-center border-2 p-1  rounded-lg">
					<input
						type="text"
						id="searchText"
						name="searchText"
						placeholder={`Search by ${placeHolder}`}
						value={searchText}
						onChange={handleSearchChange}
						className="w-full h-full outline-none"
					/>
					<AiOutlineSearch className="text-gray-400 text-2xl" />
				</div>

				{sortingFields.map((fieldObj) => (
					<div
						key={fieldObj.field}
						className="flex items-center  p-1 rounded-lg cursor-pointer"
					>
						<span
							onClick={() => handleSortFieldChange(fieldObj.field)}
							className="w-full"
						>
							{fieldObj.label}
							{sortField === fieldObj.field && sortOrder === "asc" ? (
								<HiOutlineSortDescending className="text-gray-400 text-2xl inline ml-1" />
							) : (
								<HiOutlineSortAscending className="text-gray-400 text-2xl inline ml-1" />
							)}
						</span>
					</div>
				))}
			</div>
			<button
				type="button"
				onClick={() => handleSortFieldChange(sortField)}
				className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-dark"
			>
				Search
			</button>
		</div>
	);
}

export default Search;
