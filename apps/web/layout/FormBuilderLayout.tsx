import { Child } from "@app/types";
import { FormBuilderNav } from "./components/FormBuilderNav";

export const FormBuilderLayout = ({ children }: Child) => {
  return (
    <div className="flex flex-col">
      <FormBuilderNav />
      <div className="w-full mt-12">{children}</div>
    </div>
  );
};
