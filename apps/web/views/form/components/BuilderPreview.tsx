import { cn } from "@app/ui/lib/utils";
import { useRef, useId } from "react";
import { useDrop } from "react-dnd";
import { IFormInput } from "@app/views/form";
import { RenderField } from "./RenderField";
import { useFormState } from "@app/store/useFormState";

export const BuilderPreview = () => {
  const {
    label,
    placeHolder,
    isRequired,
    activeField,
    setActiveField,
    options,
  } = useFormState();
  const ref = useRef<HTMLDivElement>(null);
  const tempId = useId();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FIELD",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: { id: IFormInput | null }) => setActiveField(item.id),
  }));
  drop(ref);

  return (
    <div className="border bg-white p-12">
      <section className="shadow-md border border-gray-300 h-[calc(100%-50px)] rounded-md overflow-y-scroll px-4 py-6">
        {activeField ? (
          <RenderField
            fieldProperty={{
              type: activeField,
              label: label,
              placeholder: placeHolder,
              id: tempId,
              required: isRequired,
              selectOptions: options.map((opt) => ({ option: opt })),
            }}
          />
        ) : (
          <div
            ref={ref}
            className={cn(
              "border-dotted py-4 grid place-content-center rounded-lg border-2 border-black",
              isOver && "border-red-600"
            )}
          >
            <span className="text-center">Drop a Field Here</span>
          </div>
        )}
      </section>
    </div>
  );
};
