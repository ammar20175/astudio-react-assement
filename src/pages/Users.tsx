import { useEffect, useState } from "react";
import Table from "../components/Table";
import Search from "../components/Search";
import { useAppState } from "../context/initialState";
import Pagination from "../components/Pagination";

function Users() {
	const [pageSize, setPageSize] = useState(5);
	const [searchText, setSearchText] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [sortField, setSortField] = useState<"firstName" | "email">(
		"firstName"
	);
	const [queryPageNumber, setQueryPageNumber] = useState<number>(1);

	const { fetchUsers, users, userTotalPages } = useAppState();

	console.log(userTotalPages, "USERSFFSDA");
	useEffect(() => {
		fetchUsers(pageSize, queryPageNumber);
	}, [fetchUsers, pageSize, queryPageNumber]);

	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize);
		setQueryPageNumber(1);
		fetchUsers(newPageSize, 1);
	};

	const handleSearch = (newSearchText: string) => {
		setSearchText(newSearchText);
	};

	const handleSortChange = (newSortField: "firstName" | "email") => {
		if (sortField === newSortField) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(newSortField);
			setSortOrder("asc");
		}
	};

	const filteredUsers = users.filter((user) =>
		user.firstName.toLowerCase().includes(searchText.toLowerCase())
	);

	const sortedUsers = [...filteredUsers].sort((a, b) => {
		const compareResult =
			sortOrder === "asc"
				? a[sortField].localeCompare(b[sortField])
				: b[sortField].localeCompare(a[sortField]);

		return compareResult;
	});

	const handleQueryPageNumber = (pageNum: number) => {
		setQueryPageNumber(pageNum);
		fetchUsers(pageSize, pageNum);
	};

	const sortingFields = [
		{ field: "firstName", label: "First Name" },
		{ field: "email", label: "Email" },
	];

	return (
		<div className="rounded-2xl bg-white py-7 pl-6 pr-8 space-y-7">
			<Search
				pageSizeOptions={[5, 10, 20, 50]}
				onPageSizeChange={handlePageSizeChange}
				onSearch={handleSearch}
				onSortChange={handleSortChange}
				sortingFields={sortingFields}
				initialSortField="firstName"
				initialSortOrder="asc"
				placeHolder="name"
			/>

			<Table
				cellNum={5}
				cols={[
					"FIRST NAME",
					"LAST NAME",
					"MAIDEN NAME",
					"AGE",
					"GENDER",
					"EMAIL",
					"USERNAME",
					"BLOOD GROUP",
					"EYE COLOR",
				]}
				data={sortedUsers.map((user) => ({
					"FIRST NAME": user.firstName,
					"LAST NAME": user.lastName,
					"MAIDEN NAME": user.maidenName!,
					AGE: user.age,
					GENDER: user.gender,
					EMAIL: user.email,
					USERNAME: user.username,
					"BLOOD GROUP": user.bloodGroup,
					"EYE COLOR": user.eyeColor,
				}))}
			/>

			<div className="flex items-center justify-center">
				<Pagination
					totalPages={userTotalPages}
					currentPage={queryPageNumber}
					handleQueryPageNumber={handleQueryPageNumber}
					maxVisibleButtons={3}
				/>
			</div>
		</div>
	);
}

export default Users;
