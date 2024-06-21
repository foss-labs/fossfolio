import { NextPageWithLayout } from "next";
import { FormBuilderLayout } from "@app/layout";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiHandler } from "@app/config";
import { useRouter } from "next/router";
import { useEvent } from "@app/hooks/api/Events";
import { useFormSchema } from "@app/hooks/api/form";
import { useMutation } from "@tanstack/react-query";
import { Iform } from "@app/types";
import { toast } from "sonner";
import { useRoles, useToggle } from "@app/hooks";
import { useEffect, useState } from "react";
import { Loader } from "@app/components/preloaders";
import {
  AvailableFields,
  IFormInput,
  BuilderConfig,
  BuilderPreview,
} from "@app/views/form";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as yup from "yup";

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

const Form: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useFormSchema();
  const { data: eventInfo } = useEvent("event");
  const [isFormStatusChanging, toggleFormStatus] = useToggle(false);
  const [isAiForm, setAiForm] = useToggle();
  const { canEditEvent } = useRoles();

  const [savingAIForm, setSavingAIForm] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [isFormLoading, setFormLoading] = useState(false);
  const [tempForm, setTempForm] = useState<Iform[]>([]);
  const { pk, id } = router.query;
  const [messages, setMessages] = useState<
    Array<{
      ai: boolean;
      text: string;
    }>
  >([]);

  const form = useForm<FormValidator>({
    mode: "onSubmit",
    resolver: yupResolver(builderSchema),
    defaultValues: {
      type: "SingleLineText",
    },
  });

  const [activeField, setActiveField] = useState<IFormInput | null>(null);

  const { fields, append, remove } = useFieldArray<FormValidator>({
    control: form.control,
    name: "selectOptions",
  });

  const addNewField = () => {
    append({
      option: "",
    });
  };

  const generateForm = async () => {
    try {
      setFormLoading(true);
      const data = await apiHandler.post("/ai/form", {
        prompt: prompt,
        messages: messages,
      });
      setMessages([
        ...messages,
        {
          ai: false,
          text: prompt,
        },
        { ai: true, text: data.data?.fields },
      ]);
      setTempForm(data.data?.fields);
    } catch {
      toast.error("Error generating form");
    } finally {
      setFormLoading(false);
    }
  };

  const publishForm = async (status: boolean) => {
    try {
      toggleFormStatus.on();
      await apiHandler.post(`/events/publish/form/${pk}`, {
        organizationId: id,
        shouldFormPublish: status,
      });

      if (status) {
        toast.success("form was published successfully");
      } else {
        toast.success("form was unpublished successfully");
      }
    } catch {
      toast.error("Couldn't complete the operation");
    } finally {
      toggleFormStatus.off();
    }
  };

  const updateSchema = async (schema: Iform) => {
    try {
      const options =
        schema.selectOptions && schema.selectOptions.map((data) => data.option);
      const payload = {
        ...schema,
        selectOptions: options,
      };

      await apiHandler.post("/events/form", {
        organizationId: router.query?.id,
        data: payload,
        eventId: eventInfo?.id,
      });
    } catch {
      toast.error("Error adding new schema");
    }
  };

  const { isLoading: isSchemaUpdating, mutate } = useMutation(updateSchema, {
    onSuccess: () => {
      refetch();
      form.reset();
    },
  });

  const handleUpdates: SubmitHandler<FormValidator> = async (data) => {
    mutate(data);
  };

  const handleCancel = () => {
    form.reset();
  };

  const handleFieldDelete = (index: number) => {
    if (fields.length === 1) return;

    remove(index);
  };

  const isSingleOrMultiSelect =
    form.watch("type") === "SingleSelect" ||
    form.watch("type") === "MultiSelect";

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

  const saveAIForm = async () => {
    try {
      setSavingAIForm(true);
      await Promise.all(tempForm.map((schema) => updateSchema(schema)));
    } catch {
      toast.error("Error adding new schema");
    } finally {
      setTempForm([]);
      setSavingAIForm(false);
      refetch();
      form.reset();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pt-4 pr-3 grid grid-cols-[1.4fr_3.8fr_3.8fr] w-full fixed">
      <DndProvider backend={HTML5Backend}>
        <AvailableFields />
        <BuilderPreview setActiveField={setActiveField} />
      </DndProvider>
      <BuilderConfig />
    </div>
  );
};

Form.Layout = FormBuilderLayout;
Form.RequireAuth = true;
export default Form;
