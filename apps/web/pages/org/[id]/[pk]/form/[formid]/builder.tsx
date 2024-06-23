import { NextPageWithLayout } from "next";
import { FormBuilderLayout } from "@app/layout";
import { apiHandler } from "@app/config";
import { useRouter } from "next/router";
import { useFormSchema } from "@app/hooks/api/form";
import { Iform } from "@app/types";
import { toast } from "sonner";
import { useToggle } from "@app/hooks";
import { useState } from "react";
import { Loader } from "@app/components/preloaders";
import {
  AvailableFields,
  BuilderConfig,
  BuilderPreview,
} from "@app/views/form";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Form: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useFormSchema();
  const [isFormStatusChanging, toggleFormStatus] = useToggle(false);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pt-4 pr-3 grid grid-cols-[1.4fr_4.8fr_2.8fr] w-full fixed">
      <DndProvider backend={HTML5Backend}>
        <AvailableFields />
        <BuilderPreview />
      </DndProvider>
      <BuilderConfig />
    </div>
  );
};

Form.Layout = FormBuilderLayout;
Form.RequireAuth = true;
export default Form;
