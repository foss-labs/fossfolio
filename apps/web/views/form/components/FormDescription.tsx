import { Input } from "@app/ui/components/input";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewFormSchema, NewFormValidationSchema } from "./common";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@app/ui/components/form";
import { useUpdateForm } from "@app/hooks/api/form";

export const FormDescription = ({ title, description }: NewFormSchema) => {
  const { mutate } = useUpdateForm();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const form = useForm<NewFormSchema>({
    resolver: yupResolver(NewFormValidationSchema),
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit: SubmitHandler<NewFormSchema> = async (data) => {
    setIsEditingTitle(false);
    setIsEditingDescription(false);
    await mutate({
      title: data.title,
      description: data.description,
    });
  };

  const handleBlur = async (field: "title" | "description") => {
    if (field === "title" && !form.formState.errors.title) {
      setIsEditingTitle(false);
    } else if (field === "description" && !form.formState.errors.description) {
      setIsEditingDescription(false);
    }
    if (form.formState.isValid) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <motion.div
      className="border py-5 mb-2 rounded-md px-3 flex flex-col gap-3"
      animate={{ scale: isEditingTitle || isEditingDescription ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <FormProvider {...form}>
        {isEditingTitle ? (
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    {...form.register("title")}
                    onBlur={() => handleBlur("title")}
                    autoFocus
                    className="font-bold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <h1
            className="font-bold p-2 hover:cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={() => setIsEditingTitle(true)}
          >
            {form.getValues("title")}
          </h1>
        )}
        {isEditingDescription ? (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    {...form.register("description")}
                    onBlur={() => handleBlur("description")}
                    className="text-sm text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <span
            className="text-sm text-gray-500 p-2 hover:cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={() => setIsEditingDescription(true)}
          >
            {form.getValues("description")}
          </span>
        )}
      </FormProvider>
    </motion.div>
  );
};
