import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@app/ui/components/tooltip';

interface Prop {
    text: string;
    size?: number;
}

export const Truncate = ({ text, size = 10 }: Prop) => {
    const textSize = text.length;

    if (textSize > size) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>{text}</TooltipTrigger>
                    <TooltipContent>
                        <p>{text.slice(0, 9)}...</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    } else {
        return <p>{text}</p>;
    }
};
