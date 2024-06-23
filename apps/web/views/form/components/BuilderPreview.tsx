import { cn } from "@app/ui/lib/utils";
import { useRef, useId } from "react";
import { useDrop } from "react-dnd";
import { IFormInput } from "@app/views/form";
import { RenderField } from "./RenderField";
import { useFormState } from "@app/store/useFormState";
import { useFormSchema } from "@app/hooks/api/form";
import { FormResponse } from "@app/hooks/api/form/useFormSchema";

export const BuilderPreview = () => {
  const {
    label,
    placeHolder,
    isRequired,
    activeField,
    setActiveField,
    options,
    setFormState,
    id: fieldPrimaryKey,
  } = useFormState();

  const { data } = useFormSchema();

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

  const handleFieldEdit = (field: FormResponse) => {
    setFormState({
      isRequired: field.required,
      activeField: field.type,
      options: [],
      label: field.name,
      placeHolder: field.placeholder,
      id: field.id,
    });
  };

  return (
    <div className="border bg-white p-12">
      <section className="shadow-md border border-gray-300 h-[calc(100%-50px)] rounded-md overflow-y-scroll px-4 py-6">
        {data &&
          data?.map((field) => (
            <div
              key={field.id}
              className="hover:cursor-pointer!"
              onClick={() => handleFieldEdit(field)}
            >
              <RenderField
                fieldProperty={{
                  type: field.type,
                  label: field.name,
                  placeholder: field.placeholder,
                  id: field.id,
                  require: field.required,
                  selectOptions: options.map((opt) => ({ option: opt })),
                }}
              />
            </div>
          ))}
        {activeField && !fieldPrimaryKey && (
          <RenderField
            fieldProperty={{
              type: activeField,
              label: label,
              placeholder: placeHolder,
              id: tempId,
              require: isRequired,
              selectOptions: options.map((opt) => ({ option: opt })),
            }}
          />
        )}
        {!activeField && (
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
