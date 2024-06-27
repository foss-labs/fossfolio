import { cn } from "@app/ui/lib/utils";
import { useRef, useId, useState } from "react";
import { useDrop } from "react-dnd";
import { IFormInput } from "@app/views/form";
import { RenderField } from "./RenderField";
import { useFormState } from "@app/store/useFormState";
import { useFormSchema } from "@app/hooks/api/form";
import { Schema } from "@app/hooks/api/form/useFormSchema";
import Image from "next/image";
import { DROP_FIELD } from "../constants";
import { convert2base64 } from "@app/utils";
import { FormDescription } from "./FormDescription";
import { motion } from "framer-motion";

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
  const [previewUrl, setPreview] = useState("");
  const tempId = useId();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DROP_FIELD,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: { id: IFormInput | null }) => setActiveField(item.id),
  }));
  drop(ref);

  const handleFieldEdit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    field: Schema
  ) => {
    e.stopPropagation();
    setFormState({
      isRequired: field.required,
      activeField: field.type,
      options: field.options,
      label: field.name,
      placeHolder: field.placeholder,
      id: field.id,
    });
  };

  const handleCoverImageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    document.getElementById("cover-image-selector")?.click();
  };

  const onFileUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    let file;

    if (e.type === "drop") {
      const dragEvent = e as React.DragEvent<HTMLDivElement>;
      file = dragEvent.dataTransfer.files[0];
    } else {
      const changeEvent = e as React.ChangeEvent<HTMLInputElement>;
      file = changeEvent.target.files?.[0];
    }

    if (file) {
      convert2base64(file, (image) => setPreview(image as string));
    }
  };

  return (
    <div className="bg-white p-12 border h-full">
      <div
        className="relative bg-gray-200 rounded-lg image-container bottom-10"
        onDrop={onFileUpload}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Main iMage"
            height={200}
            width={400}
            className="rounded-lg"
          />
        ) : (
          <div
            className="border-dotted py-4 flex justify-center rounded-lg border-2 border-black h-[200px]"
            onClick={handleCoverImageClick}
          >
            <input
              type="file"
              className="hidden"
              id="cover-image-selector"
              onChange={onFileUpload}
            />
            <span className="text-center rounded-md bg-white border h-8 p-4 grid place-content-center hover:cursor-pointer">
              Drag Image to upload or click here
            </span>
          </div>
        )}
      </div>
      <section className="shadow-md border border-gray-300 h-[calc(100%-165px)]  rounded-md overflow-y-scroll px-4 py-6 w-[45%] left-8 right-28 top-24 mx-auto bg-white absolute">
        {data?.data && (
          <FormDescription
            title={data?.data.title}
            description={data?.data.description}
          />
        )}
        {data &&
          data.schema?.map((field) => (
            <motion.div
              key={field.id}
              onClick={(e) => handleFieldEdit(e, field)}
              className={cn(
                "hover:cursor-pointer! mt-3",
                fieldPrimaryKey === field.id &&
                  "bg-gray-100 border rounded-md p-6"
              )}
              transition={{ duration: 0.3 }}
              animate={{ scale: fieldPrimaryKey === field.id ? 1.02 : 1 }}
            >
              <RenderField
                fieldProperty={{
                  type: field.type,
                  label: field.name,
                  placeholder: field.placeholder,
                  id: field.id,
                  require: field.required,
                  selectOptions: field.options
                    ? field.options?.map((opt) => ({ option: opt }))
                    : [],
                }}
              />
            </motion.div>
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
              "border-dotted py-4 grid place-content-center rounded-lg border-2 border-black ",
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
