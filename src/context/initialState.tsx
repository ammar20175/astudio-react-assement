import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { toast } from "react-toastify";

type IContext = {
	users: User[];
	products: Product[];
	userTotalPages: number;
	productTotalPages: number;
	fetchProducts: (pageSize: number, page: number) => void;
	fetchUsers: (pageSize: number, page: number) => void;
};

const AppContext = createContext<IContext>({
	users: [],
	products: [],
	userTotalPages: 0,
	productTotalPages: 0,
	fetchProducts: () => {},
	fetchUsers: () => {},
});

export default function AppContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [users, setUsers] = useState<User[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [userTotalPages, setUserTotalPages] = useState<number>(0);
	const [productTotalPages, setProductTotalPages] = useState<number>(0);

	const fetchProducts = useCallback(async (pageSize: number, page: number) => {
		try {
			const skip = (page - 1) * pageSize;
			const data = await fetch(
				`https://dummyjson.com/products?skip=${skip}&limit=${pageSize}`
			).then((res) => res.json());

			const products: Product[] = data.products;
			const totalCount: number = data.total;

			const totalPages: number = Math.ceil(totalCount / pageSize);

			setProducts(products);
			setProductTotalPages(totalPages);
		} catch (err) {
			toast.error("An error occurred while loading the users");
			return 0;
		}
	}, []);

	const fetchUsers = useCallback(async (pageSize: number, page: number) => {
		try {
			const skip = (page - 1) * pageSize;
			const data = await fetch(
				`https://dummyjson.com/users?skip=${skip}&limit=${pageSize}`
			).then((res) => res.json());

			const users: User[] = data.users;
			const totalCount: number = data.total;

			const totalPages: number = Math.ceil(totalCount / pageSize);

			setUsers(users);
			setUserTotalPages(totalPages);
		} catch (err) {
			toast.error("An error occurred while loading the users");
			return 0;
		}
	}, []);

	const memoizedValue = useMemo(
		() => ({
			users,
			products,
			fetchProducts,
			fetchUsers,
			userTotalPages,
			productTotalPages,
		}),
		[
			users,
			products,
			fetchProducts,
			userTotalPages,
			productTotalPages,
			fetchUsers,
		]
	);

	return (
		<AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
	);
}

export const useAppState = () => {
	return useContext(AppContext);
};
