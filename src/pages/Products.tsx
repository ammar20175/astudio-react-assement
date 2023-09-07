import { useEffect, useState } from "react";
import Table from "../components/Table";
import Search from "../components/Search";
import { useAppState } from "../context/initialState";
import Pagination from "../components/Pagination";

function Products() {
	const [pageSize, setPageSize] = useState(5);
	const [searchText, setSearchText] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [sortField, setSortField] = useState<"title" | "price" | "rating">(
		"title"
	);
	const [queryPageNumber, setQueryPageNumber] = useState<number>(1);

	const { fetchProducts, products, productTotalPages } = useAppState();

	useEffect(() => {
		fetchProducts(pageSize, queryPageNumber);
	}, [fetchProducts, pageSize, queryPageNumber]);

	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize);
		setQueryPageNumber(1);
		fetchProducts(newPageSize, 1);
	};

	const handleSearch = (newSearchText: string) => {
		setSearchText(newSearchText);
	};

	const handleSortChange = (newSortField: "title" | "price" | "rating") => {
		if (sortField === newSortField) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(newSortField);
			setSortOrder("asc");
		}
	};

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchText.toLowerCase())
	);

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortOrder === "asc") {
			return a[sortField] < b[sortField] ? -1 : 1;
		} else {
			return a[sortField] > b[sortField] ? -1 : 1;
		}
	});

	const handleQueryPageNumber = (pageNum: number) => {
		setQueryPageNumber(pageNum);
		fetchProducts(pageSize, pageNum);
	};

	const sortingFields = [
		{ field: "title", label: "Title" },
		{ field: "price", label: "Price" },
		{ field: "rating", label: "Rating" },
	];

	return (
		<div className="rounded-2xl bg-white py-7 pl-6 pr-8 space-y-7">
			<Search
				pageSizeOptions={[5, 10, 20, 50]}
				onPageSizeChange={handlePageSizeChange}
				onSearch={handleSearch}
				onSortChange={handleSortChange}
				sortingFields={sortingFields}
				initialSortField="title"
				initialSortOrder="asc"
				placeHolder="title"
			/>

			<Table
				cellNum={1}
				cols={[
					"Title",
					"Description",
					"Price",
					"Discount %",
					"Rating",
					"Stock",
					"Brand",
					"Category",
				]}
				data={sortedProducts.map((product) => ({
					Title: product.title,
					Description: product.description,
					Price: `$${product.price.toFixed(2)}`,
					"Discount %": `${product.discountPercentage.toFixed(2)}%`,
					Rating: product.rating.toFixed(2),
					Stock: product.stock,
					Brand: product.brand,
					Category: product.category,
				}))}
			/>

			<div className="flex items-center justify-center">
				<Pagination
					totalPages={productTotalPages}
					currentPage={queryPageNumber}
					handleQueryPageNumber={handleQueryPageNumber}
					maxVisibleButtons={3}
				/>
			</div>
		</div>
	);
}

export default Products;
