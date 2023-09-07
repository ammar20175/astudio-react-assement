import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	isActive?: boolean;
	label: number;
};

function PaginationButton({ isActive, label, onClick, ...props }: Props) {
	return (
		<>
			<button
				{...props}
				onClick={onClick}
				className={`text-kblack w-10 h-10 text-sm border border-primary rounded-full text-center outline-none active:ring-4 ring-primary/50 ${
					isActive && "bg-primary text-kblack"
				} `}
			>
				{label}
			</button>
		</>
	);
}

export default PaginationButton;
