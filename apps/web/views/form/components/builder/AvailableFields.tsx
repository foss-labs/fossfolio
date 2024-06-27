import { InputOption } from "@app/views/form";
import { Fields } from "./Field";

export const AvailableFields = () => {
  return (
    <nav className="px-5 py-2 flex border border-t-0 h-screen bg-gray-100">
      <div className="flex flex-col justify-between gap-4 h-[50%]">
        <h3 className="text-center font-semibold">Drag & Drop</h3>
        {InputOption.map((option, index) => (
          <Fields key={index} value={option.value} label={option.label} />
        ))}
      </div>
    </nav>
  );
};
