import { NextPageWithLayout } from "next";
import { FormBuilderLayout } from "@app/layout";
import { apiHandler } from "@app/config";
import { useFormSchema } from "@app/hooks/api/form";
import { Iform } from "@app/types";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "@app/components/preloaders";
import {
  AvailableFields,
  BuilderConfig,
  BuilderPreview,
} from "@app/views/form";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMediaQuery } from "@app/hooks";

const Form: NextPageWithLayout = () => {
  const { isLoading } = useFormSchema();
  const [prompt, setPrompt] = useState<string>("");
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");
  const [isFormLoading, setFormLoading] = useState(false);
  const [tempForm, setTempForm] = useState<Iform[]>([]);
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

  if (isLoading) {
    return <Loader />;
  }

  if (isPhoneScreen) {
    return (
      <div className="h-screen grid place-content-center">
        <h4>Mobile Screen not supported</h4>
      </div>
    );
  }

  return (
    <div className="pt-4 pr-3 grid grid-cols-[1fr_6.2fr_1.8fr] lg:grid-cols-[1.4fr_5.8fr_1.8fr] w-full fixed">
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
