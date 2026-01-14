import { SearchIcon } from "lucide-react";
import Spinner from "@/components/common/Spinner";

import type { SearchableListProps } from "./types";

function SearchableList<T,>(props: SearchableListProps<T>) {
    return (
        <div className="grid grid-rows-[auto_1fr] h-full">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-800 px-4 py-3">
                <div className="flex items-center gap-3 text-zinc-300">
                    <props.icon className="w-4 h-4" />
                    <h3 className="text-sm font-black tracking-[0.2em] uppercase">
                        {props.title}
                    </h3>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.onSearchSubmit();
                    }}
                    className="flex items-center gap-3 w-full lg:w-auto"
                >
                    {/* Input */}
                    <div className="w-full lg:w-64">
                        <input
                            type="text"
                            className="
                                w-full h-9 rounded-md
                                bg-zinc-900 border border-zinc-700
                                pl-3 pr-9
                                text-sm font-mono text-zinc-200
                                placeholder:text-zinc-500
                                focus:outline-none focus:ring-1 focus:ring-zinc-500
                            "
                            placeholder="Search..."
                            value={props.searchQuery}
                            onChange={(e) =>
                                props.onSearchQueryChange(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={props.loading}
                        className="
                            h-9 w-9 rounded-md border border-zinc-700
                            text-zinc-300
                            hover:bg-zinc-800 transition
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center
                        "
                    >
                        {props.loading ? (
                            <Spinner />
                        ) : (
                            <SearchIcon className="w-4 h-4" />
                        )}
                    </button>
                </form>
            </div>

            {/* Content */}
            <div className="scrollbar-thin overflow-y-auto p-4">
                {props.children ? (
                    props.children
                ) : props.data && props.data.length > 0 ? (
                    <div
                    className={`
                        grid gap-4
                        ${props.gridClassName ?? "grid-cols-1 lg:grid-cols-2"}
                    `}
                    >
                    {props.data.map(props.renderItem!)}
                    </div>
                ) : (
                    props.emptyState ?? (
                    <div className="text-center text-zinc-500 opacity-40">
                        No data
                    </div>
                    )
                )}
            </div>
        </div>
    );
}

export default SearchableList;
