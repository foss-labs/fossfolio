import { Input } from "@app/ui/components/input";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form";
import { FormProvider } from "react-hook-form";
import * as yup from "yup";
import { IFormInput, InputOption } from "@app/views/form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@app/ui/components/select";
import { Checkbox } from "@app/ui/components/checkbox";
import { Button } from "@app/components/ui/Button";
import { useFormState } from "@app/store/useFormState";
import { useEffect } from "react";

const builderSchema = yup.object().shape({
  label: yup.string().required("label is required"),
  placeholder: yup.string(),
  required: yup.boolean().optional().default(false),
  type: yup
    .string()
    .required("question type is required") as yup.StringSchema<IFormInput>,
  selectOptions: yup
    .array(
      yup.object({
        option: yup.string().trim().required("this is a required field"),
      })
    )
    .when("type", {
      is: (val: IFormInput) => val === "MultiSelect" || val === "SingleSelect",
      then: (schema) => schema.required("this is a required field"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export type FormValidator = yup.InferType<typeof builderSchema>;

export const BuilderConfig = () => {
  const { activeField, setLabel, setActiveField, setPlaceHolder } =
    useFormState();

  const form = useForm<FormValidator>({
    mode: "onSubmit",
    resolver: yupResolver(builderSchema),
    defaultValues: {
      type: activeField || undefined,
    },
  });

  useEffect(() => {
    const updatedType = form.watch("type");
    if (updatedType) {
      setActiveField(updatedType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("type")]);

  return (
    <div className="border p-4 bg-gray-100">
      <h3 className="text-start font-semibold">Settings</h3>
      <div className="flex flex-col justify-between h-full max-h-[calc(100%-100px)]">
        <section className="p-2">
          <FormProvider {...form}>
            <div className="flex justify-between gap-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Field label"
                        {...field}
                        onChange={(e) => setLabel(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="type">Field Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="type" className="bg-white">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          {InputOption.map((el) => (
                            <SelectItem
                              key={el.value as string}
                              value={el.value as string}
                            >
                              {el.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between gap-8 mt-5">
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Required</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="w-[47%]">
                    <FormLabel>Default Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        onChange={(e) => setPlaceHolder(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormProvider>
        </section>
        <section className="flex gap-5">
          <Button variant="outline" onClick={() => setActiveField(null)}>
            Cancel
          </Button>
          <Button>Save</Button>
        </section>
      </div>
    </div>
  );
};
