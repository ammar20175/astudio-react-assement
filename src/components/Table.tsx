type TypedColumn = string | JSX.Element;

type Props = {
	cols: TypedColumn[];
	data: { [prop: string]: string | number | JSX.Element }[];
	cellNum?: number;
	cellNum2?: number;
};

function Table({ cols, data, cellNum, cellNum2 }: Props) {
	return (
		<table className="w-full">
			<thead className="text-sm text-kblack bg-primary table w-full table-fixed h-14 divide-x-2 text-center">
				{cols.map((col, i) => (
					<th
						className={`p-2 ${
							i === cellNum || i === cellNum2 ? "w-[100%]" : "w-[50%]"
						}`}
						key={i}
					>
						{col}
					</th>
				))}
			</thead>

			<tbody className="block max-h-[600px] overflow-y-auto mt-1 p-2 text-center">
				{data.map((item, i) => (
					<tr className="table w-full table-fixed" key={i}>
						{Object.values(item).map((val, j) => (
							<td
								width={j === cellNum || j === cellNum2 ? "100%" : "50%"}
								className={`py-5 border-b border-klightgrey text-kblack font-semibold ${
									j < cols.length - 1 ? "border-r border-klightgrey" : ""
								}`}
								key={j}
							>
								{val}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Table;
