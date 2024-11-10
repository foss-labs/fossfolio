import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { DashboardLayout } from "@app/layout";
import { apiHandler, ENV } from "@app/config";
import { useEvent } from "@app/hooks/api/Events";
import { Loader } from "@app/components/preloaders";
import { useMediaQuery, useRoles } from "@app/hooks";
import { Input } from "@app/ui/components/input";
import { Editor as EditorType } from "@tiptap/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/ui/components/form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Truncate } from "@app/components/ui/Truncate";
import * as yup from "yup";
import { Button } from "@app/components/ui/Button";
import { FaPlus } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/components/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@app/ui/components/popover";
import { Textarea } from "@app/ui/components/textarea";
import { Editor } from "@app/components/editor";
import { useQueryClient } from "@tanstack/react-query";

// Schema for a single FAQ
const faqItemSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

// Schema for event data
const eventSchema = yup.object({
  name: yup.string().required("Event name is required"),
  slug: yup.string().required("Event slug is required"),
  tagLine: yup.string().required("Tagline is required"),
  faqs: yup.array().of(faqItemSchema).default([]),
});

type EventFormData = yup.InferType<typeof eventSchema>;
type Faq = yup.InferType<typeof faqAddSchema>;

// Schema for the FAQ add form
const faqAddSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

type FaqAddFormData = yup.InferType<typeof faqAddSchema>;

const Event = () => {
  const { data, isLoading } = useEvent("event");
  const router = useRouter();
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");
  const { id, eventid } = router.query as { id: string; eventid: string };
  const { canEditEvent } = useRoles();
  const [editor, setEditor] = useState<EditorType | null>(null);
  const queryClient = useQueryClient();

  // Main form for event data including FAQs array
  const eventForm = useForm<EventFormData>({
    mode: "onChange",
    resolver: yupResolver(eventSchema),
    defaultValues: {
      slug: data?.slug || "",
      name: data?.name || "",
    },
  });

  // Separate form for adding new FAQs
  const faqAddForm = useForm<FaqAddFormData>({
    mode: "onChange",
    resolver: yupResolver(faqAddSchema),
  });

  // Field array for managing FAQs
  const { fields, append, remove } = useFieldArray({
    control: eventForm.control,
    name: "faqs",
  });

  useEffect(() => {
    if (data) {
      eventForm.reset({
        name: data.name,
        slug: data.slug,
      });
    }
  }, [data, eventForm]);

  const handleSaveShortcut = async (event: KeyboardEvent) => {
    if (!canEditEvent) return;

    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      try {
        await handleUpdate();
        toast.success("Changes saved successfully");
      } catch (error) {
        toast.error("Error saving changes");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, []);

  const handleUpdate = async () => {
    if (!canEditEvent) return;

    try {
      const formData = eventForm.getValues();

      console.log(formData);

      await apiHandler.patch(
        `events`,
        {
          name: formData.name,
          slug: formData.slug,
          description: JSON.stringify(editor?.getJSON()),
        },
        {
          params: {
            eventId: eventid,
            orgId: id,
          },
        }
      );

      toast.success("Event updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-events", eventid] });
    } catch (error) {
      toast.error("Failed to update event");
      console.error("Error updating event:", error);
    }
  };

  const handleFaqAdd: SubmitHandler<FaqAddFormData> = (data) => {
    if (fields.length >= 10) {
      toast.error("Maximum 10 FAQs allowed");
      return;
    }

    // Add new FAQ to the field array
    append({
      title: data.title,
      description: data.description,
    });

    // Reset the FAQ add form
    faqAddForm.reset();
  };

  const handleReset = () => {
    eventForm.reset();
    localStorage.removeItem("novel__content");
    toast("Form reset to original values");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mt-6">
      <div className="flex gap-2 px-10 items-end w-full justify-end">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={eventForm.handleSubmit(handleUpdate)}>Save All</Button>
      </div>

      <div className="px-10 py-4 h-screen mb-20 grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <Form {...eventForm}>
          <form className="px-1 h-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-3 h-full">
              <FormField
                control={eventForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Event Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={eventForm.control}
                name="tagLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TagLine</FormLabel>
                    <FormControl>
                      <Input placeholder="TagLine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Description</FormLabel>
              <Editor getEditor={(editor) => setEditor(editor)} />
              <FormField
                control={eventForm.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Event Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Truncate
                className="text-xs font-normal text-start"
                text={`${ENV.web_base_url}/events/${eventForm.watch("slug")}`}
                size={isPhoneScreen ? 30 : 50}
              />
            </div>
          </form>
        </Form>

        {/* FAQs Section */}
        <div className="w-full flex flex-col">
          <h3 className="font-semibold mb-4">Event FAQs</h3>

          {fields.map((faq, index) => (
            <section key={faq.id} className="flex mb-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>
                    <FormField
                      control={eventForm.control}
                      name={`faqs.${index}.title`}
                      render={({ field }) => (
                        <Input {...field} className="mr-2" />
                      )}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={eventForm.control}
                      name={`faqs.${index}.description`}
                      render={({ field }) => <Textarea {...field} />}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                Delete
              </Button>
            </section>
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-sm gap-2 self-end mt-2"
                size="sm"
                variant="outline"
                rightIcon={<FaPlus />}
              >
                Add FAQ
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-4 flex gap-3 flex-col mr-5">
              <Form {...faqAddForm}>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={faqAddForm.handleSubmit(handleFaqAdd)}
                >
                  <FormField
                    control={faqAddForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="FAQ Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={faqAddForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="FAQ Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">
                    Add FAQ
                  </Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

Event.Layout = DashboardLayout;
Event.RequireAuth = true;

export default Event;
