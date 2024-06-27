import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@app/ui/components/tooltip";

interface Prop {
  text: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export const Truncate = ({ text, size = 10, className, children }: Prop) => {
  if (text.length > size) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={className}>
            {text.substring(0, size - 1)}...
          </TooltipTrigger>
          <TooltipContent>{children ? children : <p>{text}</p>}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return <p className={className}>{text}</p>;
  }
};
