import { Input } from "@app/ui/components/input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
import { MdDeleteForever } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
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
  const {
    activeField,
    setLabel,
    setActiveField,
    setPlaceHolder,
    options,
    setOptions,
    resetFormState,
  } = useFormState();

  const form = useForm<FormValidator>({
    mode: "onBlur",
    resolver: yupResolver(builderSchema),
    defaultValues: {
      type: activeField || undefined,
    },
  });

  const { fields, append, remove } = useFieldArray<FormValidator>({
    control: form.control,
    name: "selectOptions",
    rules: {
      minLength: 1,
    },
  });

  const isSingleOrMultiSelect =
    form.watch("type") === "SingleSelect" ||
    form.watch("type") === "MultiSelect";

  const addNewField = () => {
    if (Object.hasOwn(form.formState.errors, "selectOptions")) {
      return;
    }

    if (fields.length - 1) {
      setOptions(options, fields[fields.length - 1]?.option);
    }

    append({
      option: "",
    });
  };

  const handleFieldDelete = (index: number) => {
    if (fields.length === 1) return;

    remove(index);
  };

  useEffect(() => {
    if (isSingleOrMultiSelect) {
      addNewField();
    } else {
      for (let i = 0; i < fields.length; i++) {
        remove(i);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSingleOrMultiSelect]);

  useEffect(() => {
    const updatedType = form.watch("type");
    if (updatedType) {
      setActiveField(updatedType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("type")]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "label" && typeof value.label === "string") {
        setLabel(value.label);
      } else if (name === "type" && typeof value.type === "string") {
        setActiveField(value.type);
      } else if (
        name === "placeholder" &&
        typeof value.placeholder === "string"
      ) {
        setPlaceHolder(value.placeholder);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleUpdates: SubmitHandler<FormValidator> = async (data) => {
    console.log(data);
  };

  return (
    <div className="border p-4 bg-gray-100 overflow-y-scroll h-">
      <h3 className="text-start font-semibold">Settings</h3>
      <section className="p-2 flex flex-col justify-between h-full max-h-[calc(100%-100px)]">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleUpdates)}>
            <div className="flex justify-between gap-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Field label" {...field} />
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
                name="placeholder"
                render={({ field }) => (
                  <FormItem className="w-[47%]">
                    <FormLabel>Default Value</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isSingleOrMultiSelect && (
              <>
                {fields.map((dynamicField, index) => (
                  <div
                    className="flex items-center space-x-2 mt-3 group"
                    key={index}
                  >
                    <FormField
                      key={index}
                      control={form.control}
                      name={`selectOptions.${index}.option`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                          <FormLabel className="flex items-center">
                            Option {index + 1}
                            <span
                              className="ml-2 self-center hover:cursor-pointer  hidden group-hover:inline"
                              onClick={() => handleFieldDelete(index)}
                            >
                              <MdDeleteForever className="text-md text-red-600" />
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input className="w-full" {...field} />
                          </FormControl>
                          <FormMessage {...field} />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={addNewField}
                >
                  <IoIosAdd className="text-xl" />
                </Button>
              </>
            )}
            <div className="mt-5 flex gap-5">
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                  resetFormState();
                }}
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};