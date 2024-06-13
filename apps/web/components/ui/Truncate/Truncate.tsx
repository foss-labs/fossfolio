import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@app/ui/components/tooltip";

interface Prop {
  text: string;
  size?: number;
}

export const Truncate = ({ text, size = 10 }: Prop) => {
  if (text.length > size) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{text.substring(0, size - 1)}...</TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return <p>{text}</p>;
  }
};
