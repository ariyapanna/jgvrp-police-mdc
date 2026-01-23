export type Column<T> = {
    key: string;
    header: string;
    align?: "left" | "center" | "right";
    render: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
};
