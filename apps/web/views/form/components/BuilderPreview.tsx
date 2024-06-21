import { cn } from "@app/ui/lib/utils";
import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { IFormInput } from "@app/views/form";

interface Props {
  setActiveField: React.Dispatch<IFormInput | null>;
}

export const BuilderPreview = ({ setActiveField }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FIELD",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  drop(ref);

  return (
    <div className="border bg-white p-12">
      <section className="shadow-md border border-gray-300 h-[calc(100%-50px)] rounded-md overflow-y-scroll px-4 py-6">
        <div
          ref={ref}
          className={cn(
            "border-dotted py-4 grid place-content-center rounded-lg border-2 border-black",
            isOver && "border-red-600"
          )}
        >
          <span className="text-center">Drop a Field Here</span>
        </div>
      </section>
    </div>
  );
};
