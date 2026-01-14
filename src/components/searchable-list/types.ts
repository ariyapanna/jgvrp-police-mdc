export type SearchableListProps<T> = {
    title: string;
    icon?: any;

    searchQuery: string;
    onSearchQueryChange: (v: string) => void;
    onSearchSubmit: () => void;

    loading: boolean;
    data?: T[],

    renderItem?: (item: T) => React.ReactNode;

    gridClassName?: string;
    emptyState?: React.ReactNode;

    children?: React.ReactNode;
}