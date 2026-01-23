interface FilterOption 
{
    label: string;
    value: string;
}

interface FilterSelectProps 
{
    value: string;
    onChange: (v: string) => void;
    options: FilterOption[];
}

const FilterSelect = ({ value, onChange, options }: FilterSelectProps) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
                h-9 rounded-md
                bg-zinc-900 border border-zinc-700
                px-3 text-sm text-zinc-200
                font-mono
            "
        >
            {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
            ))}
        </select>
    );
};

export default FilterSelect;
