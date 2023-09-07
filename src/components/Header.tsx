import { Link } from "react-router-dom";
import TabButton from "./TabButtons";
import { useState, useEffect } from "react";

type Tabs = "home" | "users" | "products";

function Header() {
	const [selectedTab, setSelectedTab] = useState<Tabs>(() => {
		const storedTab = localStorage.getItem("selectedTab");
		return (storedTab as Tabs) || "home";
	});

	useEffect(() => {
		localStorage.setItem("selectedTab", selectedTab);
	}, [selectedTab]);

	return (
		<header className="p-10 mt-10 ml-10">
			<div className="flex space-x-3 lg:space-x-5">
				<Link to="/">
					<TabButton
						isActive={selectedTab === "home"}
						onClick={() => setSelectedTab("home")}
					>
						Home
					</TabButton>
				</Link>

				<Link to="/users">
					<TabButton
						isActive={selectedTab === "users"}
						onClick={() => setSelectedTab("users")}
					>
						User
					</TabButton>
				</Link>

				<Link to="/products">
					<TabButton
						isActive={selectedTab === "products"}
						onClick={() => setSelectedTab("products")}
					>
						Products
					</TabButton>
				</Link>
			</div>
		</header>
	);
}

export default Header;
