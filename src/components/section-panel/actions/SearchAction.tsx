import Spinner from "@/components/common/Spinner";
import { SearchIcon } from "lucide-react";

interface SearchActionProps 
{
    value: string;

    onChange: (v: string) => void;
    onSubmit: () => void;

    placeholder?: string;
    loading?: boolean;
}

const SearchAction = ({ value, onChange, onSubmit, placeholder, loading }: SearchActionProps) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="flex items-center gap-2 w-full lg:w-auto"
        >
            <input
                className="
                    w-full h-9 rounded-md
                    bg-zinc-900 border border-zinc-700
                    px-3 text-sm font-mono text-zinc-200
                "
                placeholder={placeholder || "Search..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <button
                type="submit"
                disabled={loading}
                className="h-9 w-9 rounded-md border border-zinc-700 flex items-center justify-center"
            >
                {loading ? <Spinner size="sm" /> : <SearchIcon className="w-4 h-4" />}
            </button>
        </form>
    )
}

export default SearchAction;