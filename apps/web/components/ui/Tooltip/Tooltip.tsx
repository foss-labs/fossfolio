import {
    Tooltip as ShadcnToolTip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@app/ui/components/tooltip';

interface Prop {
    content: string;
    toolTipMessage: string;
}

export const Tooltip = ({ content, toolTipMessage }: Prop) => {
    return (
        <TooltipProvider>
            <ShadcnToolTip>
                <TooltipTrigger>{toolTipMessage}</TooltipTrigger>
                <TooltipContent>{content}</TooltipContent>
            </ShadcnToolTip>
        </TooltipProvider>
    );
};
