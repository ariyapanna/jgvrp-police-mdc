import { PlusIcon } from "lucide-react";
import Spinner from "@/components/common/Spinner";

interface CreateButtonProps 
{
    onClick: () => void;
    label?: string;

    backgroundColor: string;
    hoverColor: string;
    shadow: string;

    textColor?: string;

    loading?: boolean;
}

const CreateButton = ({ onClick, label = "Create", backgroundColor, hoverColor, shadow, textColor, loading = false }: CreateButtonProps) => {
    return (
        <button
            onClick={loading ? undefined : onClick}
            disabled={loading}
            className={`
                font-mono h-7 px-3 rounded-md
                flex items-center justify-center gap-2

                ${backgroundColor}
                ${textColor ?? "text-white"}
                ${shadow}
                text-xs

                ${!loading ? hoverColor : "opacity-60 cursor-not-allowed"}
                transition
            `}
        >
            {loading ? (
                <Spinner size="sm" />
            ) : (
                <>
                    <PlusIcon className="w-4 h-4" />
                    <span>{label.toUpperCase()}</span>
                </>
            )}
        </button>
    );
};

export default CreateButton;