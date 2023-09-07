import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users";
import Products from "./pages/Products";
import RootLayout from "./pages/RootLayout";

export default function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <RootLayout />,
			children: [
				{ index: true, element: <Home /> },
				{
					path: "/users",
					element: <Users />,
				},
				{
					path: "/products",
					element: <Products />,
				},
			],
		},
	]);

	return (
		<>
			<ToastContainer
				autoClose={3000}
				closeButton={false}
				position="top-center"
				toastClassName="text-accent"
			/>

			<RouterProvider router={router} />
		</>
	);
}
