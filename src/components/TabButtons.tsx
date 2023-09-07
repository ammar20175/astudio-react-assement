type TabButtonProps = {
	children: React.ReactNode;
	isActive: boolean;
	onClick: () => void;
};

function TabButton({ children, onClick, isActive }: TabButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`text-kblack text-xl md:text-2xl font-bold tracking-wide ${
				isActive ? "border-b-kyellow border-b-4 pb-1" : "opacity-50"
			}`}
		>
			{children}
		</button>
	);
}

export default TabButton;
