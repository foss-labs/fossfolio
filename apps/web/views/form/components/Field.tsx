import { cn } from "@app/ui/lib/utils";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DROP_FIELD } from "../constants";

interface Prop {
  label: string;
  value: string;
}

export const Fields = ({ label, value }: Prop) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DROP_FIELD,
    item: { id: value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      className={cn(
        "bg-white rounded-sm py-2 px-5 hover:cursor-grab",
        isDragging && "shadow-lg"
      )}
      ref={ref}
    >
      <span>{label}</span>
    </div>
  );
};
