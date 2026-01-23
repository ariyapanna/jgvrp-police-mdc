interface SpinnerProps 
{
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "default" | "accent" | "muted";
    className?: string;
}

const SIZE_MAP = {
    xs: "w-3 h-3 border",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-4",
};

const VARIANT_MAP = {
    default: "border-zinc-600 border-t-white",
    accent: "border-zinc-700 border-t-orange-500",
    muted: "border-zinc-800 border-t-zinc-500",
};

const Spinner = ({ size = "md", variant = "default", className = "" }: SpinnerProps) => {
    return (
        <div
            className={`
                ${SIZE_MAP[size]}
                ${VARIANT_MAP[variant]}
                rounded-full animate-spin
                ${className}
            `}
        />
    );
};

export default Spinner;