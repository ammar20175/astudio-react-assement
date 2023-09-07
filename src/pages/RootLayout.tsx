import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootLayout() {
	return (
		<>
			<Header />

			<main className="max-h-screen max-w-9xl mx-5 lg:mx-auto overflow-hidden p-10">
				<Outlet />
			</main>
		</>
	);
}

export default RootLayout;
