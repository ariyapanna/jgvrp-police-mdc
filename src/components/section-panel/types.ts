import type { AccentColor } from "@/types/accent-color/accentColor";

export interface SectionPanelProps
{
    title: string;
    subtitle?: React.ReactNode;
    icon?: any;

    actions?: React.ReactNode;

    loading: boolean;

    children?: React.ReactNode;
    accent?: AccentColor;
}