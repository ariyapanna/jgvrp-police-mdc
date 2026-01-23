interface DataTableProps<T> 
{
    data: T[];
    columns: {
        key: string;
        header: string;
        align?: "left" | "center" | "right";
        className?: string;
        render: (row: T) => React.ReactNode;
    }[];

    rowKey: (row: T) => string | number;

    loading?: boolean;
    emptyMessage?: string;

    onRowClick?: (row: T) => void;
}

const DataTable = <T,>({data, columns, rowKey, loading, emptyMessage = "No data", onRowClick }: DataTableProps<T>) => {
    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-black border-b border-white/10">
                        <tr>
                            {columns.map(col => (
                                <th
                                    key={col.key}
                                    className={`
                                        px-6 py-4 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]
                                        border-r border-white/5 last:border-r-0
                                        ${
                                            col.align === "right"
                                                ? "text-right"
                                                : col.align === "center"
                                                ? "text-center"
                                                : "text-left"
                                        }
                                    `}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/[0.03]">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="py-3 text-center opacity-40">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="py-3 text-center opacity-40">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map(row => (
                                <tr
                                    key={rowKey(row)}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                    className={`${onRowClick ? "hover:bg-white/[0.02] cursor-pointer" : ""}`}
                                >
                                    {columns.map(col => (
                                        <td
                                            key={col.key}
                                            className={`
                                                px-6 py-4 text-xs text-zinc-300
                                                ${col.align === "center" && "text-center"}
                                                ${col.align === "right" && "text-right"}
                                            `}
                                        >
                                            {col.render(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;